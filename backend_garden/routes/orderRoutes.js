const express = require('express');
const router = express.Router();
const { 
  createOrder, 
  getUserOrders, 
  getAllOrders, 
  getOrder, 
  updateOrderStatus 
} = require('../controllers/orderController');
const { authenticateToken, requireAdmin, optionalAuth } = require('../middleware/auth');
const { validateOrder, validateId, validatePagination } = require('../middleware/validation');

// Routes that work with or without authentication
router.post('/', optionalAuth, validateOrder, createOrder);

// Protected user routes
router.get('/my-orders', authenticateToken, validatePagination, getUserOrders);
router.get('/:id', authenticateToken, validateId, getOrder);

// Admin routes
router.get('/', authenticateToken, requireAdmin, validatePagination, getAllOrders);
router.patch('/:id/status', authenticateToken, requireAdmin, validateId, updateOrderStatus);

module.exports = router;
