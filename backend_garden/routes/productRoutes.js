const express = require('express');
const router = express.Router();
const { 
  getProducts, 
  getProduct, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/productController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { validateProduct, validateId, validatePagination } = require('../middleware/validation');
const { upload, handleUploadError } = require('../middleware/upload');

// Public routes
router.get('/', validatePagination, getProducts);
router.get('/:id', validateId, getProduct);

// Admin routes
router.post('/', 
  authenticateToken, 
  requireAdmin, 
  upload.single('image'), 
  handleUploadError,
  validateProduct, 
  createProduct
);

router.put('/:id', 
  authenticateToken, 
  requireAdmin, 
  validateId,
  upload.single('image'), 
  handleUploadError,
  validateProduct, 
  updateProduct
);

router.delete('/:id', 
  authenticateToken, 
  requireAdmin, 
  validateId, 
  deleteProduct
);

module.exports = router;
