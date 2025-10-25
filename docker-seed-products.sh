#!/bin/sh

echo "🌱 Seeding products in Docker container..."

# รอ database พร้อม
echo "⏳ Waiting for database connection..."
sleep 15

# รัน seed products
echo "🌱 Running product seeding..."
npm run seed:products

# ตรวจสอบผลลัพธ์
if [ $? -eq 0 ]; then
    echo "✅ Products seeded successfully!"
    echo "📊 You can now access the API at http://localhost:3001/api/products"
else
    echo "❌ Product seeding failed!"
    echo "💡 Make sure your database is running and accessible"
fi
