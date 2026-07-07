const {
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  getCartByCustomerId,
} = require('../services/cartService');

const { assertValidObjectId } = require('../utils/validation');

const addItemHandler = async (req, res) => {
  try {
    const { menuItemId, quantity } = req.validatedCartBody || {};

    const customerId = req.user?.userId;
    const safeCustomerId = assertValidObjectId({ value: customerId, field: 'customerId' });

    const cart = await addItemToCart({
      customerId: safeCustomerId,
      menuItemId,
      quantity,
    });

    return res.status(201).json({ success: true, message: 'Item added to cart', data: cart });
  } catch (err) {
    const statusCode = err?.statusCode || 500;
    return res.status(statusCode).json({ success: false, message: err?.message || 'Internal Server Error' });
  }
};

const removeItemHandler = async (req, res) => {
  try {
    const { menuItemId } = req.validatedCartParams || {};

    const customerId = req.user?.userId;
    const safeCustomerId = assertValidObjectId({ value: customerId, field: 'customerId' });

    const cart = await removeItemFromCart({
      customerId: safeCustomerId,
      menuItemId,
    });

    return res.status(200).json({ success: true, message: 'Item removed from cart', data: cart });
  } catch (err) {
    const statusCode = err?.statusCode || 500;
    return res.status(statusCode).json({ success: false, message: err?.message || 'Internal Server Error' });
  }
};

const updateQuantityHandler = async (req, res) => {
  try {
    const { menuItemId } = req.validatedCartParams || {};
    const { quantity } = req.validatedCartBody || {};

    const customerId = req.user?.userId;
    const safeCustomerId = assertValidObjectId({ value: customerId, field: 'customerId' });

    const cart = await updateItemQuantity({
      customerId: safeCustomerId,
      menuItemId,
      quantity,
    });

    return res.status(200).json({ success: true, message: 'Cart updated', data: cart });
  } catch (err) {
    const statusCode = err?.statusCode || 500;
    return res.status(statusCode).json({ success: false, message: err?.message || 'Internal Server Error' });
  }
};

const getCartHandler = async (req, res) => {
  try {
    const customerId = req.user?.userId;
    const safeCustomerId = assertValidObjectId({ value: customerId, field: 'customerId' });

    const cart = await getCartByCustomerId(safeCustomerId);
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    return res.status(200).json({ success: true, message: 'Cart fetched', data: cart });
  } catch (err) {
    const statusCode = err?.statusCode || 500;
    return res.status(statusCode).json({ success: false, message: err?.message || 'Internal Server Error' });
  }
};


module.exports = {
  addItemHandler,
  removeItemHandler,
  updateQuantityHandler,
  getCartHandler,
};


