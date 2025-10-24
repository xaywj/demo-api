const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { AuthenticationError, ForbiddenError } = require('apollo-server-express');

// Verify token function
const verifyToken = (token) => {
  if (!token) {
    throw new AuthenticationError('Authentication required. Please login.');
  }

  try {
    // Remove "Bearer " prefix if present
    if (token.startsWith('Bearer ')) {
      token = token.slice(7);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new AuthenticationError('Invalid or expired token');
  }
};

// Check if user is admin
const isAdmin = async (userId) => {
  const user = await User.findByPk(userId);
  
  if (!user || user.role !== 'admin') {
    throw new ForbiddenError('Not authorized. Admin access required.');
  }
  
  return user;
};

module.exports = {
  Query: {
    // Get all users (admin only)
    getUsers: async (_, { pagination = {} }, { token }) => {
      const decoded = verifyToken(token);
      await isAdmin(decoded.id);
      
      // Set default pagination values
      const page = pagination.page || 1;
      const limit = pagination.limit || 10;
      const offset = (page - 1) * limit;
      
      // Get users with pagination
      const { count, rows: users } = await User.findAndCountAll({
        limit,
        offset,
        order: [['createdAt', 'DESC']] // Optional: order by creation date
      });
      
      // Calculate pagination info
      const totalPages = Math.ceil(count / limit);
      
      return {
        users,
        totalCount: count,
        pageInfo: {
          currentPage: page,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1
        }
      };
    },
    
    // Get single user by ID
    getUser: async (_, { id }, { token }) => {
      const decoded = verifyToken(token);
      const currentUser = await User.findByPk(decoded.id);
      
      // Allow admins to access any user, but regular users can only access themselves
      if (currentUser.role !== 'admin' && decoded.id !== id) {
        throw new ForbiddenError('Not authorized to access this user');
      }
      
      return await User.findByPk(id);
    }
  },
  
  Mutation: {
    // Create new user (admin only)
    createUser: async (_, { input }, { token }) => {
      const decoded = verifyToken(token);
      await isAdmin(decoded.id);
      
      const { name, email, password, role } = input;
      
      // Check if user already exists
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        throw new Error('User already exists');
      }
      
      // Create new user
      const newUser = await User.create({
        name,
        email,
        password,
        role: role || 'user'
      });
      
      return newUser;
    },
    
    // Update user (admin or self)
    updateUser: async (_, { id, input }, { token }) => {
      const decoded = verifyToken(token);
      const currentUser = await User.findByPk(decoded.id);
      
      // Allow admins to update any user, but regular users can only update themselves
      if (currentUser.role !== 'admin' && decoded.id !== id) {
        throw new ForbiddenError('Not authorized to update this user');
      }
      
      // Get user to update
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error('User not found');
      }
      
      // Update fields
      const updateData = {};
      if (input.name) updateData.name = input.name;
      if (input.email) updateData.email = input.email;
      
      // Only admins can change roles
      if (input.role && currentUser.role === 'admin') {
        updateData.role = input.role;
      }
      
      await user.update(updateData);
      return user;
    },
    
    // Delete user (admin only)
    deleteUser: async (_, { id }, { token }) => {
      const decoded = verifyToken(token);
      await isAdmin(decoded.id);
      
      // Get user to delete
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error('User not found');
      }
      
      // Don't allow deleting self
      if (user.id === decoded.id) {
        throw new Error('Cannot delete yourself');
      }
      
      await user.destroy();
      return true;
    }
  }
};