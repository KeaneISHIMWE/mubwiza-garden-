const fs = require('fs');
const path = require('path');
const { pool, createDatabase } = require('./database');

const createTables = async () => {
  // Create users table
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(50) NOT NULL,
      last_name VARCHAR(50) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      phone VARCHAR(20),
      address TEXT,
      role ENUM('customer', 'admin') DEFAULT 'customer',
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  // Create categories table
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description TEXT,
      image_url VARCHAR(255),
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  // Create products table
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(200) NOT NULL,
      description TEXT,
      price DECIMAL(10, 2) NOT NULL,
      stock_quantity INT DEFAULT 0,
      category_id INT,
      image_url VARCHAR(255),
      is_featured BOOLEAN DEFAULT FALSE,
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
    )
  `);

  // Create orders table
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      customer_name VARCHAR(100) NOT NULL,
      customer_email VARCHAR(100) NOT NULL,
      customer_phone VARCHAR(20),
      delivery_address TEXT NOT NULL,
      order_notes TEXT,
      total_amount DECIMAL(10, 2) NOT NULL,
      status ENUM('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    )
  `);

  // Create order_items table
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      order_id INT NOT NULL,
      product_id INT NOT NULL,
      quantity INT NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    )
  `);
};

const runMigrations = async () => {
  // Add phone and address columns to users table if they don't exist
  try {
    await pool.execute(`
      ALTER TABLE users
      ADD COLUMN IF NOT EXISTS phone VARCHAR(20),
      ADD COLUMN IF NOT EXISTS address TEXT
    `);
  } catch (error) {
    // MySQL doesn't support IF NOT EXISTS for ALTER TABLE, so we'll check manually
    try {
      const [columns] = await pool.execute(`
        SELECT COLUMN_NAME
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'users'
      `, [process.env.DB_NAME]);

      const columnNames = columns.map(col => col.COLUMN_NAME);

      if (!columnNames.includes('phone')) {
        await pool.execute('ALTER TABLE users ADD COLUMN phone VARCHAR(20)');
      }

      if (!columnNames.includes('address')) {
        await pool.execute('ALTER TABLE users ADD COLUMN address TEXT');
      }
    } catch (migrationError) {
      console.warn('Migration warning:', migrationError.message);
    }
  }
};

const seedInitialData = async () => {
  const bcrypt = require('bcryptjs');

  // Create admin user
  try {
    const [existingAdmin] = await pool.execute('SELECT id FROM users WHERE email = ?', ['admin@mubwizagarden.com']);

    if (existingAdmin.length === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await pool.execute(
        'INSERT INTO users (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)',
        ['Admin', 'User', 'admin@mubwizagarden.com', hashedPassword, 'admin']
      );
    }
  } catch (error) {
    console.warn('Warning creating admin user:', error.message);
  }

  // Create default categories
  const categories = [
    { name: 'Flowers', description: 'Beautiful fresh flowers for decoration and gifts' },
    { name: 'Vegetables', description: 'Fresh organic vegetables' },
    { name: 'Fruits', description: 'Seasonal fresh fruits' },
    { name: 'Tea & Spices', description: 'Aromatic tea and spices' },
    { name: 'Seedlings', description: 'Quality seedlings for your garden' }
  ];

  for (const category of categories) {
    try {
      const [existing] = await pool.execute('SELECT id FROM categories WHERE name = ?', [category.name]);
      if (existing.length === 0) {
        await pool.execute(
          'INSERT INTO categories (name, description) VALUES (?, ?)',
          [category.name, category.description]
        );
      }
    } catch (error) {
      console.warn(`Warning creating category ${category.name}:`, error.message);
    }
  }

  // Create sample products
  const products = [
    { name: 'Red Roses', description: 'Beautiful red roses perfect for gifts', price: 5000, category: 'Flowers', stock: 50, featured: true },
    { name: 'Tomatoes', description: 'Fresh organic tomatoes', price: 2000, category: 'Vegetables', stock: 100, featured: true },
    { name: 'Strawberries', description: 'Sweet fresh strawberries', price: 8000, category: 'Fruits', stock: 30, featured: true },
    { name: 'Mint Tea', description: 'Aromatic mint tea leaves', price: 3000, category: 'Tea & Spices', stock: 25, featured: false },
    { name: 'Tomato Seedlings', description: 'Healthy tomato seedlings ready for planting', price: 500, category: 'Seedlings', stock: 200, featured: false }
  ];

  for (const product of products) {
    try {
      const [existingProduct] = await pool.execute('SELECT id FROM products WHERE name = ?', [product.name]);
      if (existingProduct.length === 0) {
        const [categoryResult] = await pool.execute('SELECT id FROM categories WHERE name = ?', [product.category]);
        if (categoryResult.length > 0) {
          await pool.execute(
            'INSERT INTO products (name, description, price, stock_quantity, category_id, is_featured) VALUES (?, ?, ?, ?, ?, ?)',
            [product.name, product.description, product.price, product.stock, categoryResult[0].id, product.featured]
          );
        }
      }
    } catch (error) {
      console.warn(`Warning creating product ${product.name}:`, error.message);
    }
  }
};

const initializeDatabase = async () => {
  try {
    console.log('🚀 Initializing database...');

    // Create database first
    await createDatabase();

    // Create tables directly with proper SQL
    await createTables();

    // Run migrations for existing tables
    await runMigrations();

    // Seed initial data
    await seedInitialData();

    // Create messages table for customer communication
    const messagesTable = `
      CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        subject VARCHAR(200),
        message TEXT NOT NULL,
        status ENUM('unread', 'read', 'replied') DEFAULT 'unread',
        admin_reply TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;

    try {
      await pool.execute(messagesTable);
    } catch (error) {
      if (error.code !== 'ER_TABLE_EXISTS_ERROR') {
        console.warn(`Warning creating messages table: ${error.message}`);
      }
    }

    // Create notifications table for admin alerts
    const notificationsTable = `
      CREATE TABLE IF NOT EXISTS notifications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type ENUM('order', 'message', 'product', 'general') NOT NULL,
        title VARCHAR(200) NOT NULL,
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    try {
      await pool.execute(notificationsTable);
    } catch (error) {
      if (error.code !== 'ER_TABLE_EXISTS_ERROR') {
        console.warn(`Warning creating notifications table: ${error.message}`);
      }
    }

    console.log('✅ Database initialized successfully');
    console.log('📊 Tables created:');
    console.log('   - users (with admin account)');
    console.log('   - categories (with 5 default categories)');
    console.log('   - products (with 5 sample products)');
    console.log('   - orders');
    console.log('   - order_items');
    console.log('   - messages');
    console.log('   - notifications');
    console.log('👤 Default admin user: admin@mubwizagarden.com (password: admin123)');
    console.log('🌱 Sample data: 5 categories and 5 products created');

  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    throw error;
  }
};

module.exports = { initializeDatabase };
