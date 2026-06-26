const express = require('express');

const {
  addItemHandler,
  removeItemHandler,
  updateQuantityHandler,
  getCartHandler,
} = require('../controllers/cartController');

const router = express.Router();

// Add item to cart
router.post('/cart/add', addItemHandler);

// Update item quantity in cart
router.put('/cart/update/:menuItemId', updateQuantityHandler);

// Remove an item from cart
router.delete('/cart/remove/:menuItemId', removeItemHandler);

// Get cart by customerId
router.get('/cart/:customerId', getCartHandler);

module.exports = router;

