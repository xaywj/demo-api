# 🐳 Docker Setup สำหรับ Demo API

## 🚀 วิธีรันโปรเจคด้วย Docker

### 1. สร้าง .env file
```bash
# คัดลอกไฟล์ตัวอย่าง
cp env.example .env

# แก้ไขค่าใน .env file ตามต้องการ
# ตัวอย่าง .env file:
NODE_ENV=development
PORT=3001
DB_HOST=host.docker.internal
DB_PORT=3306
DB_NAME=course_master_db
DB_USER=root
DB_PASSWORD=
JWT_SECRET=your-super-secret-jwt-key
```

### 2. รัน Development Mode (Auto Seed Products)
```bash
# รัน application (จะ seed products อัตโนมัติ)
docker-compose up -d

# ดู logs
docker-compose logs -f app
```

### 3. รัน Production Mode
```bash
# รัน production (ไม่ seed products)
docker-compose -f docker-compose.prod.yml up -d
```

### 4. Seed Products แยกต่างหาก
```bash
# รัน seed products ใน container ที่รันอยู่
docker-compose exec app npm run seed:products

# หรือรัน script แยก
chmod +x docker-seed-products.sh
./docker-seed-products.sh
```

### 5. หยุด Application
```bash
# หยุด services
docker-compose down

# หยุด production
docker-compose -f docker-compose.prod.yml down
```

### 6. Rebuild (ถ้าแก้ไขโค้ด)
```bash
# Rebuild development
docker-compose up --build -d

# Rebuild production
docker-compose -f docker-compose.prod.yml up --build -d
```

## 🌐 Access URLs
- **API**: http://localhost:3001
- **GraphQL**: http://localhost:3001/graphql
- **Health Check**: http://localhost:3001/health

## 🔧 คำสั่งที่มีประโยชน์

### ดู logs
```bash
# ดู logs ของ application
docker-compose logs -f app
```

### เข้าไปใน container
```bash
# เข้าไปใน app container
docker-compose exec app sh
```

### ตรวจสอบ status
```bash
# ตรวจสอบ containers
docker-compose ps

# ตรวจสอบ port mapping
docker port demo-api-app
```

## 🔍 Troubleshooting

### Application ไม่ start
```bash
# ดู logs
docker-compose logs app

# ตรวจสอบ database connection
docker-compose exec app node -e "console.log('DB_HOST:', process.env.DB_HOST)"
```

### Database connection error
```bash
# ตรวจสอบ database connection
docker-compose exec app ping host.docker.internal
```

### Port conflicts
```bash
# ตรวจสอบ port ที่ใช้
docker-compose ps

# เปลี่ยน port ใน docker-compose.yml
```

## 📝 หมายเหตุ
- ใช้ `npm run dev` สำหรับ development
- Hot reload ทำงานได้ (ไฟล์จะ sync แบบ real-time)
- เชื่อมต่อกับ database บน localhost ของคุณ
