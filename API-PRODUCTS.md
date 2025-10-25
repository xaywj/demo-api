# 🛍️ Product API Documentation

## 📋 Overview
Product API สำหรับจัดการข้อมูลสินค้าพร้อม fields: name, detail, price, stock

## 🚀 Setup

### 1. Seed Mock Data
```bash
# รัน script เพื่อสร้าง mock data
npm run seed:products
```

### 2. Start Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 🌐 API Endpoints

### Base URL
```
http://localhost:3001/api/products
```

## 📚 API Endpoints

### 1. Get All Products
```http
GET /api/products
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 100)
- `search` (optional): Search in name and detail

**Example:**
```bash
curl "http://localhost:3001/api/products?page=1&limit=5&search=iPhone"
```

**Response:**
```json
{
  "success": true,
  "page": 1,
  "limit": 5,
  "total": 20,
  "pages": 4,
  "products": [
    {
      "id": 1,
      "name": "iPhone 15 Pro",
      "detail": "Latest iPhone with A17 Pro chip...",
      "price": "999.99",
      "stock": 50,
      "img": "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop",
      "created_at": "2025-10-25T16:00:00.000Z",
      "updated_at": "2025-10-25T16:00:00.000Z"
    }
  ]
}
```

### 2. Get Single Product
```http
GET /api/products/:id
```

**Example:**
```bash
curl "http://localhost:3001/api/products/1"
```

### 3. Create Product
```http
POST /api/products
```

**Request Body:**
```json
{
  "name": "New Product",
  "detail": "Product description",
  "price": 99.99,
  "stock": 10,
  "img": "https://example.com/product-image.jpg"
}
```

**Example:**
```bash
curl -X POST "http://localhost:3001/api/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Product",
    "detail": "Product description",
    "price": 99.99,
    "stock": 10,
    "img": "https://example.com/product-image.jpg"
  }'
```

### 4. Update Product
```http
PUT /api/products/:id
```

**Request Body:**
```json
{
  "name": "Updated Product Name",
  "price": 149.99,
  "stock": 5,
  "img": "https://example.com/updated-image.jpg"
}
```

**Example:**
```bash
curl -X PUT "http://localhost:3001/api/products/1" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated iPhone 15 Pro",
    "price": 1099.99
  }'
```

### 5. Delete Product
```http
DELETE /api/products/:id
```

**Example:**
```bash
curl -X DELETE "http://localhost:3001/api/products/1"
```

### 6. Get Products by Stock Status
```http
GET /api/products/stock/:status
```

**Status Options:**
- `in-stock`: Products with stock > 0
- `out-of-stock`: Products with stock = 0
- `low-stock`: Products with stock 1-10

**Example:**
```bash
curl "http://localhost:3001/api/products/stock/in-stock"
curl "http://localhost:3001/api/products/stock/out-of-stock"
curl "http://localhost:3001/api/products/stock/low-stock"
```

## 🔍 Search & Filter Examples

### Search Products
```bash
# Search by name
curl "http://localhost:3001/api/products?search=iPhone"

# Search by detail
curl "http://localhost:3001/api/products?search=camera"

# Pagination
curl "http://localhost:3001/api/products?page=2&limit=5"
```

## 📊 Mock Data Included

ระบบมาพร้อมกับ mock data 20 รายการ รวมถึง:
- 📱 **Electronics**: iPhone, Samsung, MacBook, iPad
- 🎮 **Gaming**: Nintendo Switch, PlayStation 5, Xbox
- 🏠 **Home**: Dyson vacuum, Instant Pot, KitchenAid
- 🚗 **Luxury**: Tesla Model 3
- 📷 **Photography**: DJI Drone, Canon Camera

## 🔧 Validation Rules

### Product Fields:
- **name**: Required, min 2 characters
- **detail**: Optional, max 1000 characters
- **price**: Required, must be > 0
- **stock**: Optional, must be >= 0
- **img**: Optional, must be valid URL

### Error Responses:
```json
{
  "success": false,
  "errors": [
    {
      "msg": "Product name is required",
      "param": "name",
      "location": "body"
    }
  ]
}
```

## 🚀 Quick Start

1. **Start Server:**
   ```bash
   npm run dev
   ```

2. **Seed Data:**
   ```bash
   npm run seed:products
   ```

3. **Test API:**
   ```bash
   curl "http://localhost:3001/api/products"
   ```

## 📝 Notes
- All endpoints are public (no authentication required)
- Database will be created automatically
- Mock data includes various product categories
- API supports pagination and search
