const Cart = require('../models/Cart');

const findCartByCustomerId = async (customerId) => {
  return Cart.findOne({ customerId });
};

const addItemToCart = async ({ customerId, menuItemId, name, quantity, unitPrice }) => {
  const cart = await findCartByCustomerId(customerId);

  // If no cart exists for the customer, create one.
  if (!cart) {
    const created = await Cart.create({
      customerId,
      items: [{ menuItemId, name, quantity, unitPrice }],
    });
    return created;
  }

  const existingIndex = cart.items.findIndex((i) => i.menuItemId === menuItemId);

  if (existingIndex !== -1) {
    cart.items[existingIndex].quantity += quantity;
  } else {
    cart.items.push({ menuItemId, name, quantity, unitPrice });
  }

  await cart.save();
  return cart;
};

const removeItemFromCart = async ({ customerId, menuItemId }) => {
  const cart = await findCartByCustomerId(customerId);
  if (!cart) return null;

  cart.items = cart.items.filter((i) => i.menuItemId !== menuItemId);

  await cart.save();
  return cart;
};

const updateItemQuantity = async ({ customerId, menuItemId, quantity }) => {
  const cart = await findCartByCustomerId(customerId);
  if (!cart) return null;

  const existingIndex = cart.items.findIndex((i) => i.menuItemId === menuItemId);
  if (existingIndex === -1) return null;

  cart.items[existingIndex].quantity = quantity;
  await cart.save();
  return cart;
};

const getCartByCustomerId = async (customerId) => {
  return findCartByCustomerId(customerId);
};

module.exports = {
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  getCartByCustomerId,
};

