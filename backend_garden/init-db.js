const { initializeDatabase } = require('./config/initDatabase');
require('dotenv').config();

console.log('🗄️ Mubwiza Garden Database Initialization');
console.log('==========================================\n');

const runInitialization = async () => {
  try {
    console.log('📋 Database Configuration:');
    console.log(`   Host: ${process.env.DB_HOST}`);
    console.log(`   Port: ${process.env.DB_PORT || 3306}`);
    console.log(`   User: ${process.env.DB_USER}`);
    console.log(`   Database: ${process.env.DB_NAME}\n`);

    console.log('🚀 Starting database initialization...\n');
    
    await initializeDatabase();
    
    console.log('\n🎉 Database initialization completed successfully!');
    console.log('\n📝 What was created:');
    console.log('   ✅ Database: mubwiza_garden');
    console.log('   ✅ Tables: users, categories, products, orders, order_items, messages, notifications');
    console.log('   ✅ Admin account: admin@mubwizagarden.com (password: admin123)');
    console.log('   ✅ Sample categories: Flowers, Vegetables, Fruits, Tea & Spices, Seedlings');
    console.log('   ✅ Sample products: 5 featured products ready for testing');
    
    console.log('\n🚀 Next steps:');
    console.log('   1. Start the backend server: npm run dev');
    console.log('   2. Start the frontend: npm start (in frontend_garden folder)');
    console.log('   3. Visit: http://localhost:3000');
    console.log('   4. Login as admin: admin@mubwizagarden.com / admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Database initialization failed:');
    console.error(`   Error: ${error.message}`);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Solution: MySQL is not running');
      console.log('   - If using XAMPP: Start MySQL in XAMPP Control Panel');
      console.log('   - If using MySQL Service: Start MySQL80 service');
      console.log('   - Check if MySQL is running on port 3306');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('\n💡 Solution: Check database credentials');
      console.log('   - Verify DB_USER and DB_PASSWORD in .env file');
      console.log('   - Default MySQL root user usually has no password');
    }
    
    process.exit(1);
  }
};

runInitialization();
