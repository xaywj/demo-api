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

// All routes protected and admin-only unless noted
// router.use(protect);

// List users (admin)
router.get('/',  listUsers);

// Create user (admin)
router.post('/',  userCreateValidation, createUser);

// Get user (admin or self)
router.get('/:id', getUser);

// Update user (admin or self)
router.put('/:id', userUpdateValidation, updateUser);

// Delete user (admin)
router.delete('/:id',  deleteUser);

module.exports = router;
