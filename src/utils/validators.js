const { check } = require('express-validator');

exports.registerValidation = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
];

exports.loginValidation = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
];

exports.forgotPasswordValidation = [
  check('email', 'Please include a valid email').isEmail()
];

exports.resetPasswordValidation = [
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
];

exports.userCreateValidation = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  check('role').optional().isIn(['user', 'admin']).withMessage('Invalid role')
];

exports.userUpdateValidation = [
  check('name').optional().isLength({ min: 2 }).withMessage('Name too short'),
  check('email').optional().isEmail().withMessage('Please include a valid email'),
  check('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  check('role').optional().isIn(['user', 'admin']).withMessage('Invalid role')
];

// Product validation
exports.productValidation = [
  check('name', 'Product name is required').not().isEmpty(),
  check('name', 'Product name must be at least 2 characters').isLength({ min: 2 }),
  check('price', 'Price is required').not().isEmpty(),
  check('price', 'Price must be a valid number').isNumeric(),
  check('price', 'Price must be greater than 0').isFloat({ min: 0.01 }),
  check('stock', 'Stock must be a valid number').optional().isInt({ min: 0 }),
  check('detail').optional().isLength({ max: 1000 }).withMessage('Detail too long'),
  check('img').optional().isURL().withMessage('Image must be a valid URL')
];