const express = require('express');
const { check } = require('express-validator');
const {
  register,
  login,
  forgotPassword,
  resetPassword
} = require('../controllers/authController');

const router = express.Router();

// Register route
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
  ],
  register
);

// Login route
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  login
);

// Forgot password route
router.post(
  '/forgotpassword',
  [check('email', 'Please include a valid email').isEmail()],
  forgotPassword
);

// Reset password route
router.put(
  '/resetpassword/:resettoken',
  [check('password', 'Password must be at least 6 characters').isLength({ min: 6 })],
  resetPassword
);

module.exports = router;