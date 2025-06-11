const mysql = require('mysql2');
require('dotenv').config();

console.log('🔍 Testing Database Connection...\n');

// Display current configuration
console.log('📋 Current Database Configuration:');
console.log(`   Host: ${process.env.DB_HOST}`);
console.log(`   Port: ${process.env.DB_PORT || 3306}`);
console.log(`   User: ${process.env.DB_USER}`);
console.log(`   Password: ${process.env.DB_PASSWORD ? '[SET]' : '[EMPTY]'}`);
console.log(`   Database: ${process.env.DB_NAME}\n`);

// Test 1: Basic MySQL connection (without database)
console.log('🧪 Test 1: Basic MySQL Connection...');
const basicConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

basicConnection.connect((err) => {
  if (err) {
    console.log('❌ Basic connection failed:');
    console.log(`   Error: ${err.message}`);
    console.log(`   Code: ${err.code}`);
    
    if (err.code === 'ECONNREFUSED') {
      console.log('\n💡 Solution: MySQL server is not running');
      console.log('   - If using XAMPP: Start MySQL in XAMPP Control Panel');
      console.log('   - If using MySQL Service: Start MySQL80 service');
      console.log('   - Check if port 3306 is available');
    } else if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('\n💡 Solution: Check username/password');
      console.log('   - Verify DB_USER and DB_PASSWORD in .env file');
      console.log('   - Default MySQL root user usually has no password');
    }
    
    process.exit(1);
  } else {
    console.log('✅ Basic MySQL connection successful!');
    
    // Test 2: Create database if needed
    console.log('\n🧪 Test 2: Creating database...');
    basicConnection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`, (err) => {
      if (err) {
        console.log('❌ Database creation failed:', err.message);
      } else {
        console.log(`✅ Database '${process.env.DB_NAME}' ready!`);
      }
      
      basicConnection.end();
      
      // Test 3: Connection with database
      console.log('\n🧪 Test 3: Connection with database...');
      const dbConnection = mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
      });
      
      dbConnection.connect((err) => {
        if (err) {
          console.log('❌ Database connection failed:', err.message);
        } else {
          console.log('✅ Database connection successful!');
          
          // Test 4: Simple query
          console.log('\n🧪 Test 4: Testing query...');
          dbConnection.query('SELECT 1 as test', (err, results) => {
            if (err) {
              console.log('❌ Query failed:', err.message);
            } else {
              console.log('✅ Query successful!');
              console.log('\n🎉 All tests passed! Database is ready.');
              console.log('\n🚀 You can now start the backend server with: npm run dev');
            }
            dbConnection.end();
          });
        }
      });
    });
  }
});

// Timeout after 10 seconds
setTimeout(() => {
  console.log('\n⏰ Connection test timed out after 10 seconds');
  console.log('💡 This usually means MySQL is not running or not accessible');
  process.exit(1);
}, 10000);
