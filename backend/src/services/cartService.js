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

const getMenuItemDetails = async (menuItemId) => {
  const menuDoc = await Menu.findOne({ 'items._id': menuItemId }).select({ restaurantId: 1, items: 1 });
  if (!menuDoc || !Array.isArray(menuDoc.items)) return null;

  const item = menuDoc.items.find((it) => it._id?.toString() === menuItemId);
  if (!item || typeof item.name !== 'string' || typeof item.price !== 'number') return null;

  return {
    restaurantId: menuDoc.restaurantId?.toString() || null,
    name: item.name,
    unitPrice: item.price,
  };
};

/**
 * GET CART
 */
const getCartByCustomerId = async (customerId) => {
  return findCartByCustomerId(customerId);
};

/**
 * ADD ITEM TO CART
 */
const addItemToCart = async ({ customerId, menuItemId, quantity }) => {
  const cart = await findCartByCustomerId(customerId);

  const menuItemDetails = await getMenuItemDetails(menuItemId);

  if (!menuItemDetails) {
    throw createCartValidationError(404, "Menu item not found");
  }

  const { restaurantId, name, unitPrice } = menuItemDetails;

  if (cart?.items?.length && cart.restaurantId && cart.restaurantId !== restaurantId) {
    throw createCartValidationError(400, 'Cart can contain items from only one restaurant');
  }

  if (!cart) {
    return await Cart.create({
      customerId,
      restaurantId,
      items: [
        {
          menuItemId,
          name,
          quantity,
          unitPrice,
        },
      ],
    });
  }

  const existingItemIndex = cart.items.findIndex(
    (i) => i.menuItemId === menuItemId
  );

  if (existingItemIndex > -1) {
    cart.items[existingItemIndex].quantity += quantity;
  } else {
    cart.items.push({
      menuItemId,
      name,
      quantity,
      unitPrice,
    });
  }

  cart.restaurantId = restaurantId;

  await cart.save();
  return cart;
};

/**
 * REMOVE ITEM
 */
const removeItemFromCart = async ({ customerId, menuItemId }) => {
  const cart = await findCartByCustomerId(customerId);
  if (!cart) return null;

  cart.items = cart.items.filter(
    (i) => i.menuItemId !== menuItemId
  );

  if (cart.items.length === 0) {
    cart.restaurantId = null;
  }

  await cart.save();
  return cart;
};

/**
 * UPDATE QUANTITY
 */
const updateItemQuantity = async ({
  customerId,
  menuItemId,
  quantity,
}) => {
  const cart = await findCartByCustomerId(customerId);
  if (!cart) return null;

  const item = cart.items.find(
    (i) => i.menuItemId === menuItemId
  );

  if (!item) return null;

  if (quantity <= 0) {
    cart.items = cart.items.filter(
      (i) => i.menuItemId !== menuItemId
    );
  } else {
    item.quantity = quantity;
  }

  if (cart.items.length === 0) {
    cart.restaurantId = null;
  }

  await cart.save();
  return cart;
};

module.exports = {
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  getCartByCustomerId,
};