const { pool } = require('../config/database');

// Messages table is created during database initialization

// Create new message
const createMessage = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    const [result] = await pool.execute(
      'INSERT INTO messages (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone, subject, message]
    );

    // Get the created message
    const [messages] = await pool.execute(
      'SELECT * FROM messages WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: { message: messages[0] }
    });
  } catch (error) {
    console.error('Create message error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message'
    });
  }
};

// Get all messages (Admin only)
const getAllMessages = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const status = req.query.status;

    let query = 'SELECT * FROM messages';
    let countQuery = 'SELECT COUNT(*) as total FROM messages';
    let params = [];
    let countParams = [];

    if (status) {
      query += ' WHERE status = ?';
      countQuery += ' WHERE status = ?';
      params.push(status);
      countParams.push(status);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const [messages] = await pool.execute(query, params);
    const [countResult] = await pool.execute(countQuery, countParams);

    res.json({
      success: true,
      data: {
        messages,
        pagination: {
          page,
          limit,
          total: countResult[0].total,
          pages: Math.ceil(countResult[0].total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get messages'
    });
  }
};

// Get single message (Admin only)
const getMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const [messages] = await pool.execute(
      'SELECT * FROM messages WHERE id = ?',
      [id]
    );

    if (messages.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.json({
      success: true,
      data: { message: messages[0] }
    });
  } catch (error) {
    console.error('Get message error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get message'
    });
  }
};

// Update message status (Admin only)
const updateMessageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, admin_reply } = req.body;

    const validStatuses = ['unread', 'read', 'replied'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    let query = 'UPDATE messages SET status = ?';
    let params = [status];

    if (admin_reply) {
      query += ', admin_reply = ?';
      params.push(admin_reply);
    }

    query += ' WHERE id = ?';
    params.push(id);

    const [result] = await pool.execute(query, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.json({
      success: true,
      message: 'Message updated successfully'
    });
  } catch (error) {
    console.error('Update message error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update message'
    });
  }
};

// Delete message (Admin only)
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute(
      'DELETE FROM messages WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    console.error('Delete message error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete message'
    });
  }
};

// Get message statistics (Admin only)
const getMessageStats = async (req, res) => {
  try {
    const [stats] = await pool.execute(`
      SELECT
        COUNT(*) as total,
        SUM(CASE WHEN status = 'unread' THEN 1 ELSE 0 END) as unread,
        SUM(CASE WHEN status = 'read' THEN 1 ELSE 0 END) as read,
        SUM(CASE WHEN status = 'replied' THEN 1 ELSE 0 END) as replied
      FROM messages
    `);

    res.json({
      success: true,
      data: { stats: stats[0] }
    });
  } catch (error) {
    console.error('Get message stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get message statistics'
    });
  }
};

module.exports = {
  createMessage,
  getAllMessages,
  getMessage,
  updateMessageStatus,
  deleteMessage,
  getMessageStats
};
