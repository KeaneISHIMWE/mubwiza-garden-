const { pool } = require('./config/database');
require('dotenv').config();

const updateProducts = async () => {
  try {
    console.log('🌱 Updating Mubwiza Garden Products...\n');

    // Enhanced product descriptions with images
    const productUpdates = [
      {
        name: 'Red Roses',
        description: '🌹 Beautiful fresh red roses, perfect for expressing love and appreciation. Hand-picked from our garden at peak bloom. Ideal for romantic occasions, anniversaries, or simply brightening someone\'s day. Each rose is carefully selected for its vibrant color and long-lasting freshness.',
        image: 'red roses.jpeg',
        price: 5000
      },
      {
        name: 'Tomatoes',
        description: '🍅 Fresh, juicy organic tomatoes grown in our fertile gardens. Rich in vitamins and perfect for cooking, salads, or eating fresh. These tomatoes are vine-ripened for maximum flavor and nutritional value. Grown without harmful pesticides using sustainable farming methods.',
        image: 'tomatoes.jpeg',
        price: 2000
      },
      {
        name: 'Strawberries',
        description: '🍓 Sweet, succulent strawberries bursting with natural flavor. Carefully cultivated in our garden for optimal sweetness and freshness. Rich in vitamin C and antioxidants. Perfect for desserts, smoothies, or enjoying fresh. Harvested at peak ripeness for the best taste experience.',
        image: 'strowberries.jpeg',
        price: 8000
      },
      {
        name: 'Mint Tea',
        description: '🌿 Aromatic fresh mint leaves perfect for brewing refreshing tea. Grown organically in our herb garden, these mint leaves offer a cooling, invigorating flavor. Rich in natural oils and perfect for digestive health. Can be used fresh or dried for year-round enjoyment.',
        image: 'mint tea.jpeg',
        price: 3000
      },
      {
        name: 'Tomato Seedlings',
        description: '🌱 Healthy, robust tomato seedlings ready for transplanting. These young plants are carefully nurtured in our nursery and are perfect for starting your own tomato garden. Strong root systems and disease-resistant varieties ensure successful growing. Includes planting instructions.',
        image: 'tomato seedling.jpeg',
        price: 500
      }
    ];

    for (const product of productUpdates) {
      try {
        const [result] = await pool.execute(
          'UPDATE products SET description = ?, price = ?, image_url = ? WHERE name = ?',
          [product.description, product.price, product.image, product.name]
        );

        if (result.affectedRows > 0) {
          console.log(`✅ Updated: ${product.name}`);
        } else {
          console.log(`⚠️  Product not found: ${product.name}`);
        }
      } catch (error) {
        console.error(`❌ Error updating ${product.name}:`, error.message);
      }
    }

    // Also update categories with better descriptions
    const categoryUpdates = [
      {
        name: 'Flowers',
        description: 'Beautiful fresh flowers for all occasions - decorations, gifts, and special events. Hand-picked from our garden.'
      },
      {
        name: 'Vegetables',
        description: 'Fresh, organic vegetables grown with sustainable farming practices. Rich in nutrients and flavor.'
      },
      {
        name: 'Fruits',
        description: 'Sweet, seasonal fruits harvested at peak ripeness. Perfect for healthy snacking and cooking.'
      },
      {
        name: 'Tea & Spices',
        description: 'Aromatic herbs and spices to enhance your culinary experience. Grown organically in our herb garden.'
      },
      {
        name: 'Seedlings',
        description: 'Healthy seedlings and young plants to help you start your own garden. Includes growing instructions.'
      }
    ];

    console.log('\n🏷️ Updating Categories...\n');

    for (const category of categoryUpdates) {
      try {
        const [result] = await pool.execute(
          'UPDATE categories SET description = ? WHERE name = ?',
          [category.description, category.name]
        );

        if (result.affectedRows > 0) {
          console.log(`✅ Updated category: ${category.name}`);
        } else {
          console.log(`⚠️  Category not found: ${category.name}`);
        }
      } catch (error) {
        console.error(`❌ Error updating category ${category.name}:`, error.message);
      }
    }

    console.log('\n🎉 Product and category updates completed successfully!');
    console.log('\n📝 What was updated:');
    console.log('   ✅ Enhanced product descriptions with emojis');
    console.log('   ✅ Added image references for all products');
    console.log('   ✅ Updated category descriptions');
    console.log('   ✅ Confirmed pricing in RWF');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Update failed:', error.message);
    process.exit(1);
  }
};

updateProducts();
