#!/bin/sh

echo "🚀 Starting Docker container..."

# รอ database พร้อม
echo "⏳ Waiting for database to be ready..."
sleep 10

# Sync database schema ก่อน
echo "🔄 Syncing database schema..."
node -e "
const { sequelize } = require('./src/config/database');
sequelize.sync({ force: true })
  .then(() => {
    console.log('✅ Database schema synced successfully!');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error syncing database:', err);
    process.exit(1);
  });
"

# รอให้ sync เสร็จ
sleep 5

# รัน seed products
echo "🌱 Seeding products..."
npm run seed:products

# ตรวจสอบว่า seed สำเร็จหรือไม่
if [ $? -eq 0 ]; then
    echo "✅ Products seeded successfully!"
else
    echo "⚠️ Product seeding failed, but continuing..."
fi

# รัน development server
echo "🚀 Starting development server..."
npm run dev
