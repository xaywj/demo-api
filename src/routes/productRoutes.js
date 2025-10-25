const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByStock
} = require('../controllers/productController');
const { productValidation } = require('../utils/validators');

// Get all products with search and pagination
router.get('/', getProducts);

// Get products by stock status
router.get('/stock/:status', getProductsByStock);

// Get single product by id
router.get('/:id', getProduct);

// Create a new product
router.post('/', productValidation, createProduct);

// Update a product
router.put('/:id', productValidation, updateProduct);

// Delete a product
router.delete('/:id', deleteProduct);

module.exports = router;
