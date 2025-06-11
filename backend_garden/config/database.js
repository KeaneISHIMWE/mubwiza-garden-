const mysql = require('mysql2');
require('dotenv').config();

// Parse DATABASE_URL if provided (Railway format)
let dbConfig;
if (process.env.DATABASE_URL) {
  // Parse Railway MySQL URL: mysql://user:password@host:port/database
  const url = new URL(process.env.DATABASE_URL);
  dbConfig = {
    host: url.hostname,
    port: url.port || 3306,
    user: url.username,
    password: url.password,
    database: url.pathname.slice(1), // Remove leading slash
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  };
} else {
  // Use individual environment variables
  dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  };
}

console.log('🔗 Database Config:', {
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  database: dbConfig.database
});

// Create connection pool for better performance
const pool = mysql.createPool(dbConfig);

// Get promise-based connection
const promisePool = pool.promise();

// Test database connection
const testConnection = async () => {
  try {
    const connection = await promisePool.getConnection();
    console.log('✅ Database connected successfully');
    connection.release();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
};

// Create database if it doesn't exist (skip for Railway as database already exists)
const createDatabase = async () => {
  try {
    if (process.env.DATABASE_URL) {
      // Railway database already exists, skip creation
      console.log('✅ Using Railway database - skipping database creation');
      return;
    }

    const connection = mysql.createConnection({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password
    });

    await connection.promise().execute(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
    console.log(`✅ Database '${dbConfig.database}' created or already exists`);
    connection.end();
  } catch (error) {
    console.error('❌ Error creating database:', error.message);
  }
};

module.exports = {
  pool: promisePool,
  testConnection,
  createDatabase
};
