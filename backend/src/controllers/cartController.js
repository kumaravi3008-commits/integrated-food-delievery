const {
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  getCartByCustomerId,
} = require('../services/cartService');

const {
  assertValidObjectId,
<<<<<<< HEAD
  assertQuantity,
  assertRequiredNonEmptyString,
=======
>>>>>>> 5b8d4cddc28bcea85d0dd37a2c8d886722be2797
} = require('../utils/validation');

const addItemHandler = async (req, res) => {
  try {
<<<<<<< HEAD
    const { customerId, menuItemId, name, quantity, unitPrice } = req.body || {};

    const safeCustomerId = assertValidObjectId({ value: customerId, field: 'customerId' });
    const safeMenuItemId = assertValidObjectId({ value: menuItemId, field: 'menuItemId' });
    const safeName = assertRequiredNonEmptyString({ value: name, field: 'name' });

    // unitPrice validation: needed because cart denormalizes this field.
    if (unitPrice === undefined || typeof unitPrice !== 'number' || Number.isNaN(unitPrice) || unitPrice < 0) {
      return res.status(400).json({ success: false, message: 'Validation error: unitPrice must be a number >= 0' });
    }

    const safeQuantity = assertQuantity(quantity);

    const cart = await addItemToCart({
      customerId: safeCustomerId,
      menuItemId: safeMenuItemId,
      name: safeName,
      quantity: safeQuantity,
      unitPrice,
=======
    const { menuItemId, quantity } = req.validatedCartBody || {};

    const customerId = req.user?.userId;
    const safeCustomerId = assertValidObjectId({ value: customerId, field: 'customerId' });

    const cart = await addItemToCart({
      customerId: safeCustomerId,
      menuItemId,
      quantity,
>>>>>>> 5b8d4cddc28bcea85d0dd37a2c8d886722be2797
    });

    return res.status(201).json({ success: true, message: 'Item added to cart', data: cart });
  } catch (err) {
    const statusCode = err?.statusCode || 500;
    return res.status(statusCode).json({ success: false, message: err?.message || 'Internal Server Error' });
  }
};

const removeItemHandler = async (req, res) => {
  try {
<<<<<<< HEAD
    const { menuItemId } = req.params;
    const { customerId } = req.body || {};

    const safeCustomerId = assertValidObjectId({ value: customerId, field: 'customerId' });
    const safeMenuItemId = assertValidObjectId({ value: menuItemId, field: 'menuItemId' });

    const cart = await removeItemFromCart({
      customerId: safeCustomerId,
      menuItemId: safeMenuItemId,
=======
    const { menuItemId } = req.validatedCartParams || {};

    const customerId = req.user?.userId;
    const safeCustomerId = assertValidObjectId({ value: customerId, field: 'customerId' });

    const cart = await removeItemFromCart({
      customerId: safeCustomerId,
      menuItemId,
>>>>>>> 5b8d4cddc28bcea85d0dd37a2c8d886722be2797
    });

    return res.status(200).json({ success: true, message: 'Item removed from cart', data: cart });
  } catch (err) {
    const statusCode = err?.statusCode || 500;
    return res.status(statusCode).json({ success: false, message: err?.message || 'Internal Server Error' });
  }
};

const updateQuantityHandler = async (req, res) => {
  try {
<<<<<<< HEAD
    const { menuItemId } = req.params;
    const { customerId, quantity } = req.body || {};

    const safeCustomerId = assertValidObjectId({ value: customerId, field: 'customerId' });
    const safeMenuItemId = assertValidObjectId({ value: menuItemId, field: 'menuItemId' });
    const safeQuantity = assertQuantity(quantity);

    const cart = await updateItemQuantity({
      customerId: safeCustomerId,
      menuItemId: safeMenuItemId,
      quantity: safeQuantity,
=======
    const { menuItemId } = req.validatedCartParams || {};
    const { quantity } = req.validatedCartBody || {};

    const customerId = req.user?.userId;
    const safeCustomerId = assertValidObjectId({ value: customerId, field: 'customerId' });

    const cart = await updateItemQuantity({
      customerId: safeCustomerId,
      menuItemId,
      quantity,
>>>>>>> 5b8d4cddc28bcea85d0dd37a2c8d886722be2797
    });

    return res.status(200).json({ success: true, message: 'Cart updated', data: cart });
  } catch (err) {
    const statusCode = err?.statusCode || 500;
    return res.status(statusCode).json({ success: false, message: err?.message || 'Internal Server Error' });
  }
};

const getCartHandler = async (req, res) => {
  try {
<<<<<<< HEAD
    const { customerId } = req.params;
    const safeCustomerId = assertValidObjectId({ value: customerId, field: 'customerId' });

=======
    const customerId = req.user?.userId;
    const safeCustomerId = assertValidObjectId({ value: customerId, field: 'customerId' });


>>>>>>> 5b8d4cddc28bcea85d0dd37a2c8d886722be2797
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



