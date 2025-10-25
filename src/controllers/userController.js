const User = require('../models/User');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

// @desc Create a user (admin)
// @route POST /api/users
// @access Private (admin)
exports.createUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { name, email, password, role } = req.body;

        // Check existing
        const exists = await User.findOne({ where: { email } });
        if (exists) {
            return res.status(400).json({ success: false, message: 'Email already registered' });
        }

        const user = await User.create({ name, email, password, role: role || 'user' });
        res.status(201).json({ success: true, user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc Get single user by id
// @route GET /api/users/:id
// @access Public (no auth required)
exports.getUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        res.status(200).json({ success: true, user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc Update a user
// @route PUT /api/users/:id
// @access Public (no auth required)
exports.updateUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        const { name, email, password, role } = req.body;

        if (email && email !== user.email) {
            const existing = await User.findOne({ where: { email } });
            if (existing) return res.status(400).json({ success: false, message: 'Email already in use' });
        }

        user.name = name ?? user.name;
        user.email = email ?? user.email;
        if (password) user.password = password; // hook will hash
        if (role) user.role = role;

        await user.save();
        res.status(200).json({ success: true, user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc Delete a user
// @route DELETE /api/users/:id
// @access Public (no auth required)
exports.deleteUser = async (req, res) => {
    const transaction = await User.sequelize.transaction();

    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        await user.destroy({ transaction });
        await transaction.commit();

        res.status(200).json({ success: true, message: 'User deleted' });
    } catch (err) {
        await transaction.rollback();
        console.error('Delete user error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc List users with search and pagination
// @route GET /api/users
// @access Private (admin)
exports.listUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = Math.min(parseInt(req.query.limit, 10) || 10, 100);
        const offset = (page - 1) * limit;
        const search = req.query.search || '';

        const where = {};
        if (search) {
            where[Op.or] = [
                { name: { [Op.like]: `%${search}%` } },
                { email: { [Op.like]: `%${search}%` } }
            ];
        }

        // Use separate count and find to ensure correct total count
        const total = await User.count({ where });
        const users = await User.findAll({
            where,
            offset,
            limit,
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({
            success: true,
            page,
            limit,
            total,
            pages: Math.ceil(total / limit) || 0,
            users
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
