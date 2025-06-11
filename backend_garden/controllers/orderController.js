const { pool } = require('../config/database');

// Create new order
const createOrder = async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();

    const { items, customer_name, customer_email, customer_phone, delivery_address, notes } = req.body;
    const user_id = req.user ? req.user.id : null;

    // Validate and calculate total
    let total_amount = 0;
    const orderItems = [];

    for (const item of items) {
      const [products] = await connection.execute(
        'SELECT id, name, price, stock_quantity FROM products WHERE id = ? AND is_active = TRUE',
        [item.product_id]
      );

      if (products.length === 0) {
        throw new Error(`Product with ID ${item.product_id} not found`);
      }

      const product = products[0];

      if (product.stock_quantity < item.quantity) {
        throw new Error(`Insufficient stock for ${product.name}. Available: ${product.stock_quantity}`);
      }

      const itemTotal = product.price * item.quantity;
      total_amount += itemTotal;

      orderItems.push({
        product_id: product.id,
        quantity: item.quantity,
        price: product.price
      });
    }

    // Create order
    const [orderResult] = await connection.execute(
      `INSERT INTO orders (user_id, total_amount, customer_name, customer_email, customer_phone, delivery_address, notes) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [user_id, total_amount, customer_name, customer_email, customer_phone, delivery_address, notes]
    );

    const orderId = orderResult.insertId;

    // Create order items and update stock
    for (const item of orderItems) {
      await connection.execute(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
        [orderId, item.product_id, item.quantity, item.price]
      );

      // Update product stock
      await connection.execute(
        'UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?',
        [item.quantity, item.product_id]
      );
    }

    await connection.commit();

    // Get complete order details
    const [orders] = await pool.execute(
      `SELECT o.*, 
       GROUP_CONCAT(
         CONCAT(oi.quantity, 'x ', p.name, ' @ $', oi.price) 
         SEPARATOR '; '
       ) as items_summary
       FROM orders o
       LEFT JOIN order_items oi ON o.id = oi.order_id
       LEFT JOIN products p ON oi.product_id = p.id
       WHERE o.id = ?
       GROUP BY o.id`,
      [orderId]
    );

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: { order: orders[0] }
    });

  } catch (error) {
    await connection.rollback();
    console.error('Create order error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create order'
    });
  } finally {
    connection.release();
  }
};

// Get user orders
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const [orders] = await pool.execute(
      `SELECT o.*, 
       GROUP_CONCAT(
         CONCAT(oi.quantity, 'x ', p.name, ' @ $', oi.price) 
         SEPARATOR '; '
       ) as items_summary
       FROM orders o
       LEFT JOIN order_items oi ON o.id = oi.order_id
       LEFT JOIN products p ON oi.product_id = p.id
       WHERE o.user_id = ?
       GROUP BY o.id
       ORDER BY o.created_at DESC
       LIMIT ? OFFSET ?`,
      [userId, limit, offset]
    );

    const [countResult] = await pool.execute(
      'SELECT COUNT(*) as total FROM orders WHERE user_id = ?',
      [userId]
    );

    res.json({
      success: true,
      data: {
        orders,
        pagination: {
          page,
          limit,
          total: countResult[0].total,
          pages: Math.ceil(countResult[0].total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get orders'
    });
  }
};

// Get all orders (Admin only)
const getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const status = req.query.status;

    let query = `
      SELECT o.*, 
      GROUP_CONCAT(
        CONCAT(oi.quantity, 'x ', p.name, ' @ $', oi.price) 
        SEPARATOR '; '
      ) as items_summary
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
    `;
    let countQuery = 'SELECT COUNT(*) as total FROM orders';
    let params = [];
    let countParams = [];

    if (status) {
      query += ' WHERE o.status = ?';
      countQuery += ' WHERE status = ?';
      params.push(status);
      countParams.push(status);
    }

    query += ' GROUP BY o.id ORDER BY o.created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const [orders] = await pool.execute(query, params);
    const [countResult] = await pool.execute(countQuery, countParams);

    res.json({
      success: true,
      data: {
        orders,
        pagination: {
          page,
          limit,
          total: countResult[0].total,
          pages: Math.ceil(countResult[0].total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get orders'
    });
  }
};

// Get single order
const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const isAdmin = req.user.role === 'admin';

    let query = `
      SELECT o.*, oi.id as item_id, oi.quantity, oi.price as item_price,
      p.id as product_id, p.name as product_name, p.image as product_image
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE o.id = ?
    `;
    let params = [id];

    if (!isAdmin) {
      query += ' AND o.user_id = ?';
      params.push(userId);
    }

    const [orderData] = await pool.execute(query, params);

    if (orderData.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Format order data
    const order = {
      id: orderData[0].id,
      user_id: orderData[0].user_id,
      total_amount: orderData[0].total_amount,
      status: orderData[0].status,
      customer_name: orderData[0].customer_name,
      customer_email: orderData[0].customer_email,
      customer_phone: orderData[0].customer_phone,
      delivery_address: orderData[0].delivery_address,
      notes: orderData[0].notes,
      created_at: orderData[0].created_at,
      updated_at: orderData[0].updated_at,
      items: orderData.map(item => ({
        id: item.item_id,
        product_id: item.product_id,
        product_name: item.product_name,
        product_image: item.product_image,
        quantity: item.quantity,
        price: item.item_price
      }))
    };

    res.json({
      success: true,
      data: { order }
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get order'
    });
  }
};

// Update order status (Admin only)
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const [result] = await pool.execute(
      'UPDATE orders SET status = ? WHERE id = ?',
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      message: 'Order status updated successfully'
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update order status'
    });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getAllOrders,
  getOrder,
  updateOrderStatus
};
