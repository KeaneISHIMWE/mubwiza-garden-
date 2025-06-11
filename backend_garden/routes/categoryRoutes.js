const express = require('express');
const router = express.Router();
const { 
  getCategories, 
  getCategory, 
  createCategory, 
  updateCategory, 
  deleteCategory 
} = require('../controllers/categoryController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { validateCategory, validateId } = require('../middleware/validation');
const { upload, handleUploadError } = require('../middleware/upload');

// Public routes
router.get('/', getCategories);
router.get('/:id', validateId, getCategory);

// Admin routes
router.post('/', 
  authenticateToken, 
  requireAdmin, 
  upload.single('image'), 
  handleUploadError,
  validateCategory, 
  createCategory
);

router.put('/:id', 
  authenticateToken, 
  requireAdmin, 
  validateId,
  upload.single('image'), 
  handleUploadError,
  validateCategory, 
  updateCategory
);

router.delete('/:id', 
  authenticateToken, 
  requireAdmin, 
  validateId, 
  deleteCategory
);

module.exports = router;
