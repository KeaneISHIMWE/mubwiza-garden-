const express = require('express');
const router = express.Router();
const { 
  createMessage,
  getAllMessages,
  getMessage,
  updateMessageStatus,
  deleteMessage,
  getMessageStats
} = require('../controllers/messageController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

// Validation middleware for message creation
const validateMessage = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  body('subject')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Subject must not exceed 200 characters'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    next();
  }
];

// Public route - create message
router.post('/', validateMessage, createMessage);

// Admin routes
router.get('/', authenticateToken, requireAdmin, getAllMessages);
router.get('/stats', authenticateToken, requireAdmin, getMessageStats);
router.get('/:id', authenticateToken, requireAdmin, getMessage);
router.patch('/:id', authenticateToken, requireAdmin, updateMessageStatus);
router.delete('/:id', authenticateToken, requireAdmin, deleteMessage);

module.exports = router;
