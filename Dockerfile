# ใช้ Node.js 18 Alpine เป็น base image
FROM node:18-alpine

# ตั้งค่า working directory
WORKDIR /app

# คัดลอก package files
COPY package*.json ./
COPY yarn.lock ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอก source code
COPY . .

# เปิด port
EXPOSE 5009

# รัน development mode
CMD ["npm", "run", "dev"]
