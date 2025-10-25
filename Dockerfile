# ใช้ Node.js 18 Alpine เป็น base image
FROM node:18-alpine

# ตั้งค่า working directory
WORKDIR /app

# คัดลอก package files
COPY package*.json ./ 

# ติดตั้ง dependencies
RUN npm install

# คัดลอก source code
COPY . .

# เปิด port
EXPOSE 5009

# สร้าง script สำหรับรัน seed และ start server
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# รัน entrypoint script
ENTRYPOINT ["docker-entrypoint.sh"]
