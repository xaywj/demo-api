const mockProducts = [
  {
    name: "iPhone 15 Pro",
    detail: "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system",
    price: 999.99,
    stock: 50,
    img: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop"
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    detail: "Premium Android smartphone with S Pen, 200MP camera, and AI features",
    price: 1199.99,
    stock: 30,
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop"
  },
  {
    name: "MacBook Pro 16-inch",
    detail: "Powerful laptop with M3 Pro chip, Liquid Retina XDR display, and all-day battery life",
    price: 2499.99,
    stock: 15,
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop"
  },
  {
    name: "Dell XPS 13",
    detail: "Ultra-portable laptop with 13th Gen Intel processor and InfinityEdge display",
    price: 1299.99,
    stock: 25,
    img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop"
  },
  {
    name: "iPad Air 5th Gen",
    detail: "Tablet with M1 chip, 10.9-inch Liquid Retina display, and Apple Pencil support",
    price: 599.99,
    stock: 40,
    img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop"
  },
  {
    name: "Sony WH-1000XM5",
    detail: "Industry-leading noise canceling wireless headphones with 30-hour battery life",
    price: 399.99,
    stock: 60,
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"
  },
  {
    name: "AirPods Pro 2nd Gen",
    detail: "Wireless earbuds with Active Noise Cancellation and Spatial Audio",
    price: 249.99,
    stock: 100,
    img: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&h=500&fit=crop"
  },
  {
    name: "Apple Watch Series 9",
    detail: "Smartwatch with S9 chip, Always-On Retina display, and health monitoring",
    price: 399.99,
    stock: 35,
    img: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&h=500&fit=crop"
  },
  {
    name: "Nintendo Switch OLED",
    detail: "Gaming console with 7-inch OLED screen, 64GB storage, and Joy-Con controllers",
    price: 349.99,
    stock: 20,
    img: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&h=500&fit=crop"
  },
  {
    name: "PlayStation 5",
    detail: "Next-gen gaming console with 4K gaming, ray tracing, and 3D audio",
    price: 499.99,
    stock: 10,
    img: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&h=500&fit=crop"
  },
  {
    name: "Xbox Series X",
    detail: "Gaming console with 4K gaming, 120fps support, and Game Pass",
    price: 499.99,
    stock: 8,
    img: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=500&h=500&fit=crop"
  },
  {
    name: "Dyson V15 Detect",
    detail: "Cordless vacuum with laser dust detection and 60-minute runtime",
    price: 699.99,
    stock: 12,
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop"
  },
  {
    name: "Instant Pot Duo 7-in-1",
    detail: "Electric pressure cooker with 7 functions: pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker, and warmer",
    price: 99.99,
    stock: 45,
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop"
  },
  {
    name: "KitchenAid Stand Mixer",
    detail: "5-quart stand mixer with 10 speeds and multiple attachments",
    price: 329.99,
    stock: 18,
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop"
  },
  {
    name: "Nespresso Vertuo",
    detail: "Coffee machine with Centrifusion technology and 5 cup sizes",
    price: 199.99,
    stock: 22,
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop"
  },
  {
    name: "Dyson Airwrap",
    detail: "Hair styling tool with multiple attachments for curling, smoothing, and volumizing",
    price: 599.99,
    stock: 5,
    img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&h=500&fit=crop"
  },
  {
    name: "Peloton Bike",
    detail: "Indoor cycling bike with 22-inch HD touchscreen and live classes",
    price: 1445.00,
    stock: 3,
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop"
  },
  {
    name: "Tesla Model 3",
    detail: "Electric sedan with 358-mile range, Autopilot, and over-the-air updates",
    price: 40240.00,
    stock: 2,
    img: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=500&h=500&fit=crop"
  },
  {
    name: "DJI Mavic 3 Pro",
    detail: "Professional drone with 4/3 CMOS Hasselblad camera and 43-minute flight time",
    price: 2199.99,
    stock: 7,
    img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500&h=500&fit=crop"
  },
  {
    name: "Canon EOS R5",
    detail: "Mirrorless camera with 45MP full-frame sensor and 8K video recording",
    price: 3899.99,
    stock: 4,
    img: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=500&fit=crop"
  }
];

module.exports = mockProducts;
