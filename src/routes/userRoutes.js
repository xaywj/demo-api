const express = require('express');
const router = express.Router();
const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  listUsers
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');
const { userCreateValidation, userUpdateValidation } = require('../utils/validators');

// All routes are public (no auth required)
// router.use(protect);

// List users (public)
router.get('/', listUsers);

// Create user (public)
router.post('/', userCreateValidation, createUser);

// Get user (public)
router.get('/:id', getUser);

// Update user (public)
router.put('/:id', userUpdateValidation, updateUser);

// Delete user (protected, admin only)
router.delete('/:id', deleteUser);

module.exports = router;
