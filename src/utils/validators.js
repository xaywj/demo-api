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