const mongoose = require('mongoose');

const Cart = require('../models/Cart');
const Menu = require('../models/Menu');

const findCartByCustomerId = async (customerId) => {
  return Cart.findOne({ customerId });
};

const createCartValidationError = (statusCode, message) => {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
};

const getMenuRestaurantId = async (menuItemId) => {
  const menu = await Menu.findById(menuItemId, { restaurantId: 1 });
  if (!menu) return null;
  return menu.restaurantId?.toString() || null;
};

const getCartRestaurantId = async (cart) => {
  if (!cart?.items?.length) return null;

  // Determine restaurant for existing cart items.
  const menuItemIds = cart.items.map((i) => i.menuItemId);
  const menus = await Menu.find({
    _id: { $in: menuItemIds },
  }).select({ restaurantId: 1 });

  const idToRestaurantId = new Map(menus.map((m) => [m._id.toString(), m.restaurantId?.toString()]));

  const restaurantIdsInCart = cart.items
    .map((i) => idToRestaurantId.get(i.menuItemId))
    .filter((id) => Boolean(id));

  // If existing cart items are inconsistent or missing menu docs, treat as inconsistent.
  const unique = [...new Set(restaurantIdsInCart)];
  return unique.length === 1 ? unique[0] : null;
};

const enforceSingleRestaurant = async ({ customerId, cart, incomingMenuRestaurantId }) => {
  if (!cart) return;

  if (!cart.items || cart.items.length === 0) return;

  const existingRestaurantId = await getCartRestaurantId(cart);
  if (!existingRestaurantId || existingRestaurantId !== incomingMenuRestaurantId) {
    throw createCartValidationError(
      400,
      'Cart can only contain items from one restaurant at a time'
    );
  }
};

const addItemToCart = async ({ customerId, menuItemId, name, quantity, unitPrice }) => {
  const cart = await findCartByCustomerId(customerId);

  const incomingRestaurantId = await getMenuRestaurantId(menuItemId);
  if (!incomingRestaurantId) {
    throw createCartValidationError(404, 'Menu item not found');
  }

  await enforceSingleRestaurant({ customerId, cart, incomingMenuRestaurantId: incomingRestaurantId });

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
  if (!cart) {
    return null;
  }

  const existingIndex = cart.items.findIndex((i) => i.menuItemId === menuItemId);
  if (existingIndex === -1) {
    return null;
  }

  cart.items.splice(existingIndex, 1);
  await cart.save();
  return cart;
};

const updateItemQuantity = async ({ customerId, menuItemId, quantity }) => {
  const cart = await findCartByCustomerId(customerId);
  if (!cart) {
    return null;
  }

  const existingIndex = cart.items.findIndex((i) => i.menuItemId === menuItemId);
  if (existingIndex === -1) {
    return null;
  }

  // Keep invariant: quantity > 0 is enforced at controller/validation layer.
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


