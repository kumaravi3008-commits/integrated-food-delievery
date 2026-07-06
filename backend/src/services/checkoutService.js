const mongoose = require('mongoose');

const Cart = require('../models/Cart');
const Menu = require('../models/Menu');

const DELIVERY_FEE = 40;
const TAX_RATE = 0.05;

const createCheckoutValidationError = (statusCode, message) => {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
};

const assertValidCustomerId = (customerId) => {
  if (!customerId || typeof customerId !== 'string' || !customerId.trim()) {
    throw createCheckoutValidationError(400, 'Invalid customerId');
  }

  // Required by task: keep mongoose.Types.ObjectId.isValid(customerId)
  if (!mongoose.Types.ObjectId.isValid(customerId.trim())) {
    throw createCheckoutValidationError(400, 'Invalid customerId');
  }

  return customerId.trim();
};

const getCartRestaurantConsistency = async (cart) => {
  // cart restaurant consistency must be validated at checkout time based on latest menu docs.
  if (!cart?.items?.length) return null;

  const menuItemIds = cart.items.map((i) => i.menuItemId);

  const menus = await Menu.find({ 'items._id': { $in: menuItemIds } }).select({ restaurantId: 1, items: 1 });

  const idToRestaurantId = new Map();
  menus.forEach((menu) => {
    if (!Array.isArray(menu.items)) return;
    menu.items.forEach((item) => {
      if (item?._id) {
        idToRestaurantId.set(item._id.toString(), menu.restaurantId?.toString());
      }
    });
  });

  const restaurantIdsInCart = cart.items
    .map((i) => idToRestaurantId.get(i.menuItemId))
    .filter((id) => Boolean(id));

  const unique = [...new Set(restaurantIdsInCart)];
  return unique.length === 1 ? unique[0] : null;
};

const getLatestMenuPriceForCartItem = async ({ menuItemId, cartItemName }) => {
  const menuDoc = await Menu.findOne({ 'items._id': menuItemId }).select({ restaurantId: 1, items: 1 });
  if (!menuDoc || !Array.isArray(menuDoc.items)) return null;

  const priceItem = menuDoc.items.find((it) => it._id?.toString() === menuItemId);
  if (!priceItem || typeof priceItem.price !== 'number') return null;

  return {
    restaurantId: menuDoc.restaurantId?.toString() || null,
    name: priceItem.name || cartItemName,
    price: priceItem.price,
  };
};

const createCheckoutFromCart = async ({ customerId }) => {
  const safeCustomerId = assertValidCustomerId(customerId);

  const cart = await Cart.findOne({ customerId: safeCustomerId });

  if (!cart) {
    throw createCheckoutValidationError(404, 'Cart not found');
  }

  if (!cart.items || cart.items.length === 0) {
    throw createCheckoutValidationError(400, 'Cart is empty');
  }

  // Multiple restaurants not allowed.
  const restaurantId = await getCartRestaurantConsistency(cart);
  if (!restaurantId) {
    throw createCheckoutValidationError(400, 'Multiple restaurants not allowed');
  }

  // Fetch latest prices from Menu (do not trust cart unitPrice)
  const items = [];
  let subtotal = 0;

  for (const cartItem of cart.items) {
    const quantity = Number(cartItem.quantity) || 0;
    if (quantity < 1) continue;

    const latest = await getLatestMenuPriceForCartItem({
      menuItemId: cartItem.menuItemId,
      cartItemName: cartItem.name,
    });

    if (!latest) {
      // Treat as invalid cart state.
      throw createCheckoutValidationError(400, 'Invalid cart item');
    }

    const linePrice = Number(latest.price);
    const lineTotal = quantity * linePrice;
    subtotal += lineTotal;

    items.push({
      menuItemId: cartItem.menuItemId,
      name: latest.name,
      price: linePrice,
      quantity,
    });
  }

  const deliveryFee = DELIVERY_FEE;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + deliveryFee + tax;

  return {
    restaurantId,
    items,
    subtotal,
    deliveryFee,
    tax,
    total,
  };
};

module.exports = {
  createCheckoutFromCart,
};

