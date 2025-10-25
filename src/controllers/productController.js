const Product = require('../models/Product');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const mockProducts = require('../data/mockProducts');

// @desc Get all products with search and pagination (MOCK DATA)
// @route GET /api/products
// @access Public
exports.getProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = Math.min(parseInt(req.query.limit, 10) || 10, 100);
        const search = req.query.search || '';

        // Filter mock data based on search
        let filteredProducts = mockProducts;
        if (search) {
            filteredProducts = mockProducts.filter(product => 
                product.name.toLowerCase().includes(search.toLowerCase()) ||
                product.detail.toLowerCase().includes(search.toLowerCase())
            );
        }

        const total = filteredProducts.length;
        const offset = (page - 1) * limit;
        const paginatedProducts = filteredProducts.slice(offset, offset + limit);

        // Add mock IDs and timestamps
        const productsWithIds = paginatedProducts.map((product, index) => ({
            id: offset + index + 1,
            ...product,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }));

        res.status(200).json({
            success: true,
            page,
            limit,
            total,
            pages: Math.ceil(total / limit) || 0,
            products: productsWithIds
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc Get single product by id (MOCK DATA)
// @route GET /api/products/:id
// @access Public
exports.getProduct = async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const product = mockProducts[productId - 1]; // Mock data is 0-indexed
        
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        const productWithId = {
            id: productId,
            ...product,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        res.status(200).json({ success: true, product: productWithId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc Create a new product
// @route POST /api/products
// @access Public
exports.createProduct = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { name, detail, price, stock, img } = req.body;

        const product = await Product.create({ 
            name, 
            detail, 
            price: parseFloat(price), 
            stock: parseInt(stock) || 0,
            img
        });

        res.status(201).json({ success: true, product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc Update a product
// @route PUT /api/products/:id
// @access Public
exports.updateProduct = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

        const { name, detail, price, stock, img } = req.body;

        product.name = name ?? product.name;
        product.detail = detail ?? product.detail;
        if (price !== undefined) product.price = parseFloat(price);
        if (stock !== undefined) product.stock = parseInt(stock);
        if (img !== undefined) product.img = img;

        await product.save();
        res.status(200).json({ success: true, product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Public
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

        await product.destroy();
        res.status(200).json({ success: true, message: 'Product deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc Get products by stock status (MOCK DATA)
// @route GET /api/products/stock/:status
// @access Public
exports.getProductsByStock = async (req, res) => {
    try {
        const { status } = req.params;
        let filteredProducts = mockProducts;

        if (status === 'in-stock') {
            filteredProducts = mockProducts.filter(product => product.stock > 0);
        } else if (status === 'out-of-stock') {
            filteredProducts = mockProducts.filter(product => product.stock === 0);
        } else if (status === 'low-stock') {
            filteredProducts = mockProducts.filter(product => product.stock >= 1 && product.stock <= 10);
        }

        // Sort by name and add IDs
        const sortedProducts = filteredProducts
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((product, index) => ({
                id: index + 1,
                ...product,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }));

        res.status(200).json({ success: true, products: sortedProducts });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
