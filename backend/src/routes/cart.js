const express = require('express');

const {
  addItemHandler,
  removeItemHandler,
  updateQuantityHandler,
  getCartHandler,
} = require('../controllers/cartController');

const { requireAuth } = require('../middleware/authMiddleware');
const {
  validateAddItem,
  validateRemoveItem,
  validateUpdateQuantity,
} = require('../middleware/cartValidation');

const router = express.Router();

// Add item to cart
router.post('/cart/add', requireAuth, validateAddItem, addItemHandler);

// Update item quantity in cart
router.put('/cart/update/:menuItemId', requireAuth, validateUpdateQuantity, updateQuantityHandler);

// Remove an item from cart
router.delete('/cart/remove/:menuItemId', requireAuth, validateRemoveItem, removeItemHandler);

// Get cart (customerId param is ignored; cart is bound to JWT)
router.get('/cart/:customerId', requireAuth, getCartHandler);

module.exports = router;


