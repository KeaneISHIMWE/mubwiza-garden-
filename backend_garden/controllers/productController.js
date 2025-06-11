const { pool } = require('../config/database');
const { deleteFile } = require('../middleware/upload');

// Get all products with pagination and filtering
const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const offset = (page - 1) * limit;
    const category = req.query.category;
    const search = req.query.search;
    const featured = req.query.featured;

    let query = `
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.is_active = TRUE
    `;
    let countQuery = 'SELECT COUNT(*) as total FROM products p WHERE p.is_active = TRUE';
    let queryParams = [];
    let countParams = [];

    // Add filters
    if (category) {
      query += ' AND p.category_id = ?';
      countQuery += ' AND p.category_id = ?';
      queryParams.push(category);
      countParams.push(category);
    }

    if (search) {
      query += ' AND (p.name LIKE ? OR p.description LIKE ?)';
      countQuery += ' AND (p.name LIKE ? OR p.description LIKE ?)';
      const searchTerm = `%${search}%`;
      queryParams.push(searchTerm, searchTerm);
      countParams.push(searchTerm, searchTerm);
    }

    if (featured === 'true') {
      query += ' AND p.is_featured = TRUE';
      countQuery += ' AND p.is_featured = TRUE';
    }

    // Add ordering and pagination
    query += ' ORDER BY p.created_at DESC LIMIT ? OFFSET ?';
    queryParams.push(limit, offset);

    // Execute queries
    const [products] = await pool.execute(query, queryParams);
    const [countResult] = await pool.execute(countQuery, countParams);
    const total = countResult[0].total;

    res.json({
      success: true,
      data: {
        products,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get products'
    });
  }
};

// Get single product by ID
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const [products] = await pool.execute(
      `SELECT p.*, c.name as category_name 
       FROM products p 
       LEFT JOIN categories c ON p.category_id = c.id 
       WHERE p.id = ? AND p.is_active = TRUE`,
      [id]
    );

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: { product: products[0] }
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get product'
    });
  }
};

// Create new product (Admin only)
const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock_quantity, category_id, is_featured } = req.body;
    const image = req.file ? req.file.filename : null;

    const [result] = await pool.execute(
      `INSERT INTO products (name, description, price, stock_quantity, category_id, image, is_featured) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, description, price, stock_quantity || 0, category_id, image, is_featured || false]
    );

    // Get the created product
    const [products] = await pool.execute(
      `SELECT p.*, c.name as category_name 
       FROM products p 
       LEFT JOIN categories c ON p.category_id = c.id 
       WHERE p.id = ?`,
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: { product: products[0] }
    });
  } catch (error) {
    console.error('Create product error:', error);
    // Delete uploaded file if product creation failed
    if (req.file) {
      deleteFile(req.file.filename);
    }
    res.status(500).json({
      success: false,
      message: 'Failed to create product'
    });
  }
};

// Update product (Admin only)
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock_quantity, category_id, is_featured } = req.body;
    const newImage = req.file ? req.file.filename : null;

    // Get current product to check if image needs to be deleted
    const [currentProducts] = await pool.execute(
      'SELECT image FROM products WHERE id = ?',
      [id]
    );

    if (currentProducts.length === 0) {
      if (newImage) deleteFile(newImage);
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const currentImage = currentProducts[0].image;

    // Update product
    let query = `UPDATE products SET name = ?, description = ?, price = ?, 
                 stock_quantity = ?, category_id = ?, is_featured = ?`;
    let params = [name, description, price, stock_quantity, category_id, is_featured];

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

    // Get updated product
    const [products] = await pool.execute(
      `SELECT p.*, c.name as category_name 
       FROM products p 
       LEFT JOIN categories c ON p.category_id = c.id 
       WHERE p.id = ?`,
      [id]
    );

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: { product: products[0] }
    });
  } catch (error) {
    console.error('Update product error:', error);
    if (req.file) {
      deleteFile(req.file.filename);
    }
    res.status(500).json({
      success: false,
      message: 'Failed to update product'
    });
  }
};

// Delete product (Admin only)
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Get product to delete image
    const [products] = await pool.execute(
      'SELECT image FROM products WHERE id = ?',
      [id]
    );

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Soft delete (set is_active to false)
    await pool.execute(
      'UPDATE products SET is_active = FALSE WHERE id = ?',
      [id]
    );

    // Delete image file
    if (products[0].image) {
      deleteFile(products[0].image);
    }

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete product'
    });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
};
