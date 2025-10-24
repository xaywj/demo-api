const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const { connectDB } = require('./config/database');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const { sequelize } = require('./config/database');

// Load environment variables with validation
dotenv.config();
if (!process.env.PORT || !process.env.DB_NAME || !process.env.DB_USER) {
  console.error('Missing required environment variables');
  process.exit(1);
}

// Initialize Express app
const app = express();

// Enhanced security middleware
app.use(helmet({
  contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
  crossOriginEmbedderPolicy: false,
}));

// Configure CORS
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((url) => url.trim())
  : "*",
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Rate limiting with Redis store recommended for production
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Body parser with size limit
app.use(express.json({ limit: '10kb' }));

// Connect to database with retry logic
const connectWithRetry = async () => {
  try {
    await connectDB();
  } catch (err) {
    console.error('Failed to connect to DB - retrying in 5 seconds', err);
    setTimeout(connectWithRetry, 5000);
  }
};
connectWithRetry();

// REST API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Enhanced health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    dbStatus: sequelize.authenticate() ? 'connected' : 'disconnected'
  });
});

// Apollo Server setup with better configuration
async function startApolloServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      token: req.headers.authorization || '',
      user: null // Will be populated by auth middleware
    }),
    introspection: !isProduction,
    playground: !isProduction,
    persistedQueries: false,
    cache: 'bounded',
    formatError: (err) => {
      // Don't expose internal errors in production
      if (isProduction && err.extensions?.code === 'INTERNAL_SERVER_ERROR') {
        return new Error('Internal server error');
      }
      return err;
    },
    plugins: [
      {
        async requestDidStart() {
          return {
            async willSendResponse({ response }) {
              // Security headers for GraphQL responses
              response.http.headers.set('X-Content-Type-Options', 'nosniff');
              response.http.headers.set('X-Frame-Options', 'DENY');
            }
          };
        }
      }
    ]
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ 
    app, 
    path: '/graphql',
    cors: false // Let express cors handle it
  });

  const PORT = process.env.PORT || 5009;
  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}${apolloServer.graphqlPath}`);
    console.log(`REST API base: http://localhost:${PORT}/api`);
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });
}

// Start server with error handling
startApolloServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});