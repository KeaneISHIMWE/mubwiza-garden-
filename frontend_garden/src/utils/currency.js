/**
 * Format price in Rwandan Francs (RWF)
 * @param {number} price - The price to format
 * @returns {string} - Formatted price string
 */
export const formatPrice = (price) => {
  if (typeof price !== 'number') {
    price = parseFloat(price) || 0;
  }
  
  // Format with thousands separator and RWF currency
  return new Intl.NumberFormat('en-RW', {
    style: 'currency',
    currency: 'RWF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

/**
 * Format price in simple RWF format
 * @param {number} price - The price to format
 * @returns {string} - Formatted price string (e.g., "5,000 RWF")
 */
export const formatPriceSimple = (price) => {
  if (typeof price !== 'number') {
    price = parseFloat(price) || 0;
  }
  
  return `${price.toLocaleString('en-US')} RWF`;
};

/**
 * Calculate total price for multiple items
 * @param {Array} items - Array of items with price and quantity
 * @returns {number} - Total price
 */
export const calculateTotal = (items) => {
  return items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
};
