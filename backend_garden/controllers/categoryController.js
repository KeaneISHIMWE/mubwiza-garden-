const { pool } = require('../config/database');
const { deleteFile } = require('../middleware/upload');

// Get all categories
const getCategories = async (req, res) => {
  try {
    const [categories] = await pool.execute(
      'SELECT * FROM categories WHERE is_active = TRUE ORDER BY name'
    );

    res.json({
      success: true,
      data: { categories }
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get categories'
    });
  }
};

// Get single category by ID
const getCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const [categories] = await pool.execute(
      'SELECT * FROM categories WHERE id = ? AND is_active = TRUE',
      [id]
    );

    if (categories.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.json({
      success: true,
      data: { category: categories[0] }
    });
  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get category'
    });
  }
};

// Create new category (Admin only)
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const image = req.file ? req.file.filename : null;

    // Check if category name already exists
    const [existingCategories] = await pool.execute(
      'SELECT id FROM categories WHERE name = ?',
      [name]
    );

    if (existingCategories.length > 0) {
      if (image) deleteFile(image);
      return res.status(400).json({
        success: false,
        message: 'Category with this name already exists'
      });
    }

    const [result] = await pool.execute(
      'INSERT INTO categories (name, description, image) VALUES (?, ?, ?)',
      [name, description, image]
    );

    // Get the created category
    const [categories] = await pool.execute(
      'SELECT * FROM categories WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: { category: categories[0] }
    });
  } catch (error) {
    console.error('Create category error:', error);
    if (req.file) {
      deleteFile(req.file.filename);
    }
    res.status(500).json({
      success: false,
      message: 'Failed to create category'
    });
  }
};

// Update category (Admin only)
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const newImage = req.file ? req.file.filename : null;

    // Check if category exists
    const [currentCategories] = await pool.execute(
      'SELECT image FROM categories WHERE id = ?',
      [id]
    );

    if (currentCategories.length === 0) {
      if (newImage) deleteFile(newImage);
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    // Check if name already exists (excluding current category)
    const [existingCategories] = await pool.execute(
      'SELECT id FROM categories WHERE name = ? AND id != ?',
      [name, id]
    );

    if (existingCategories.length > 0) {
      if (newImage) deleteFile(newImage);
      return res.status(400).json({
        success: false,
        message: 'Category with this name already exists'
      });
    }

    const currentImage = currentCategories[0].image;

    // Update category
    let query = 'UPDATE categories SET name = ?, description = ?';
    let params = [name, description];

    if (newImage) {
      query += ', image = ?';
      params.push(newImage);
    }

    query += ' WHERE id = ?';
    params.push(id);

    await pool.execute(query, params);

    // Delete old image if new one was uploaded
    if (newImage && currentImage) {
      deleteFile(currentImage);
    }

    // Get updated category
    const [categories] = await pool.execute(
      'SELECT * FROM categories WHERE id = ?',
      [id]
    );

    res.json({
      success: true,
      message: 'Category updated successfully',
      data: { category: categories[0] }
    });
  } catch (error) {
    console.error('Update category error:', error);
    if (req.file) {
      deleteFile(req.file.filename);
    }
    res.status(500).json({
      success: false,
      message: 'Failed to update category'
    });
  }
};

// Delete category (Admin only)
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if category has products
    const [products] = await pool.execute(
      'SELECT COUNT(*) as count FROM products WHERE category_id = ? AND is_active = TRUE',
      [id]
    );

    if (products[0].count > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete category with active products'
      });
    }

    // Get category to delete image
    const [categories] = await pool.execute(
      'SELECT image FROM categories WHERE id = ?',
      [id]
    );

    if (categories.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    // Soft delete (set is_active to false)
    await pool.execute(
      'UPDATE categories SET is_active = FALSE WHERE id = ?',
      [id]
    );

    // Delete image file
    if (categories[0].image) {
      deleteFile(categories[0].image);
    }

    res.json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete category'
    });
  }
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
};
