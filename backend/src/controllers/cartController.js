const {
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  getCartByCustomerId,
} = require('../services/cartService');

const isNonEmptyString = (v) => typeof v === 'string' && v.trim().length > 0;

const isInteger = (v) => Number.isInteger(v);

const addItemHandler = async (req, res) => {
  const { customerId, menuItemId, name, quantity, unitPrice } = req.body || {};

  if (!isNonEmptyString(customerId)) {
    return res.status(400).json({ success: false, message: 'Validation error: customerId is required' });
  }
  if (!isNonEmptyString(menuItemId)) {
    return res.status(400).json({ success: false, message: 'Validation error: menuItemId is required' });
  }
  // Name/unitPrice are needed to keep cart denormalized. If client doesn't provide name,
  // we reject because we don't have a menu lookup service here.
  if (!isNonEmptyString(name)) {
    return res.status(400).json({ success: false, message: 'Validation error: name is required' });
  }
  if (unitPrice === undefined || typeof unitPrice !== 'number' || unitPrice < 0) {
    return res
      .status(400)
      .json({ success: false, message: 'Validation error: unitPrice must be a number >= 0' });
  }
  if (quantity === undefined || typeof quantity !== 'number' || !isInteger(quantity) || quantity < 1) {
    return res
      .status(400)
      .json({ success: false, message: 'Validation error: quantity must be an integer >= 1' });
  }

  const cart = await addItemToCart({
    customerId: customerId.trim(),
    menuItemId: menuItemId.trim(),
    name: name.trim(),
    quantity,
    unitPrice,
  });

  return res.status(201).json({ success: true, data: cart });
};

const removeItemHandler = async (req, res) => {
  const { menuItemId } = req.params;
  const { customerId } = req.body || {};

  if (!isNonEmptyString(customerId)) {
    return res.status(400).json({ success: false, message: 'Validation error: customerId is required' });
  }
  if (!isNonEmptyString(menuItemId)) {
    return res.status(400).json({ success: false, message: 'Validation error: menuItemId is required' });
  }

  const cart = await removeItemFromCart({
    customerId: customerId.trim(),
    menuItemId: menuItemId.trim(),
  });

  if (!cart) {
    return res.status(404).json({ success: false, message: 'Cart not found' });
  }

  return res.status(200).json({ success: true, data: cart });
};

const updateQuantityHandler = async (req, res) => {
  const { menuItemId } = req.params;
  const { customerId, quantity } = req.body || {};

  if (!isNonEmptyString(customerId)) {
    return res.status(400).json({ success: false, message: 'Validation error: customerId is required' });
  }
  if (!isNonEmptyString(menuItemId)) {
    return res.status(400).json({ success: false, message: 'Validation error: menuItemId is required' });
  }
  if (quantity === undefined || typeof quantity !== 'number' || !isInteger(quantity) || quantity <= 0) {
    return res
      .status(400)
      .json({ success: false, message: 'Validation error: quantity must be an integer > 0' });
  }

  const cart = await updateItemQuantity({
    customerId: customerId.trim(),
    menuItemId: menuItemId.trim(),
    quantity,
  });

  if (!cart) {
    return res.status(404).json({ success: false, message: 'Cart or item not found' });
  }

  return res.status(200).json({ success: true, data: cart });
};

const getCartHandler = async (req, res) => {
  const { customerId } = req.params;

  if (!isNonEmptyString(customerId)) {
    return res.status(400).json({ success: false, message: 'Validation error: customerId is required' });
  }

  const cart = await getCartByCustomerId(customerId.trim());
  if (!cart) {
    return res.status(404).json({ success: false, message: 'Cart not found' });
  }

  return res.status(200).json({ success: true, data: cart });
};

module.exports = {
  addItemHandler,
  removeItemHandler,
  updateQuantityHandler,
  getCartHandler,
};

