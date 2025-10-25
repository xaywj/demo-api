const Product = require('../models/Product');
const mockProducts = require('../data/mockProducts');
const { sequelize } = require('../config/database');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

async function seedProducts() {
  try {
    console.log('🌱 Starting product seeding...');
    
    // Sync database
    await sequelize.sync({ force: false });
    console.log('✅ Database synced');
    
    // Clear existing products
    await Product.destroy({ where: {} });
    console.log('🗑️ Cleared existing products');
    
    // Insert mock products
    await Product.bulkCreate(mockProducts);
    console.log(`✅ Created ${mockProducts.length} products`);
    
    // Show summary
    const totalProducts = await Product.count();
    const inStockProducts = await Product.count({ where: { stock: { [require('sequelize').Op.gt]: 0 } } });
    const outOfStockProducts = await Product.count({ where: { stock: 0 } });
    
    console.log('\n📊 Product Summary:');
    console.log(`Total Products: ${totalProducts}`);
    console.log(`In Stock: ${inStockProducts}`);
    console.log(`Out of Stock: ${outOfStockProducts}`);
    
    console.log('\n🎉 Product seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding products:', error);
  } finally {
    await sequelize.close();
  }
}

// Run if called directly
if (require.main === module) {
  seedProducts();
}

module.exports = seedProducts;
