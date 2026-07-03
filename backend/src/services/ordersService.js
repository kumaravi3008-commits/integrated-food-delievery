const mongoose = require('mongoose');

const Order = require('../models/Order');
const Cart = require('../models/Cart');

const VALID_STATUSES = ['PLACED', 'ACCEPTED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED'];

const allowedTransitions = {
  PLACED: ['ACCEPTED'],
  ACCEPTED: ['PREPARING'],
  PREPARING: ['OUT_FOR_DELIVERY'],
  OUT_FOR_DELIVERY: ['DELIVERED'],
  DELIVERED: [],
};

const statusTimestampField = {
  PLACED: 'placedAt',
  ACCEPTED: 'acceptedAt',
  PREPARING: 'preparingAt',
  OUT_FOR_DELIVERY: 'outForDeliveryAt',
  DELIVERED: 'deliveredAt',
};

const createOrder = async ({ customerId, restaurantId, customer, deliveryAddress, items, payment }) => {
  const now = new Date();
  const { totalItems, subtotal, grandTotal } = computeTotals(items);
  const order = await Order.create({
    customerId,
    restaurantId,
    customer,
    deliveryAddress,
    items,
    payment,
    totalItems,
    subtotal,
    grandTotal,
    status: 'PLACED',
    orderStatus: 'PLACED',
    timestamps: { placedAt: now },
  });

  return order;
};

const computeTotals = (items) => {
  let totalItems = 0;
  let subtotal = 0;

  for (const item of items) {
    const quantity = Number(item.quantity) || 0;
    const unitPrice = Number(item.unitPrice) || 0;

    totalItems += quantity;
    subtotal += quantity * unitPrice;
  }

  const grandTotal = subtotal;
  return { totalItems, subtotal, grandTotal };
};

const createOrderFromCart = async ({ customerId, cartId }) => {
  if (!customerId) {
    const err = new Error('Validation error: customerId is required');
    err.statusCode = 400;
    throw err;
  }
  if (!cartId) {
    const err = new Error('Validation error: cartId is required');
    err.statusCode = 400;
    throw err;
  }


  if (typeof cartId !== 'string' || !mongoose.Types.ObjectId.isValid(cartId)) {
    const err = new Error('Validation error: cartId must be a valid MongoDB ObjectId');
    err.statusCode = 400;
    throw err;
  }

  const cart = await Cart.findById(cartId);
  if (!cart) {
    const err = new Error('Cart not found');
    err.statusCode = 404;
    throw err;
  }

  // Optional safety: ensure cart belongs to the customer requesting order.
  if (cart.customerId !== customerId) {
    const err = new Error('Cart does not belong to the customer');
    err.statusCode = 403;
    throw err;
  }

  if (!cart.items || cart.items.length === 0) {
    const err = new Error('Cart must contain items');
    err.statusCode = 400;
    throw err;
  }

  const itemSnapshot = cart.items.map((ci) => ({
    menuItemId: ci.menuItemId,
    name: ci.name,
    quantity: ci.quantity,
    unitPrice: ci.unitPrice,
  }));

  const { totalItems, subtotal, grandTotal } = computeTotals(itemSnapshot);

  const order = await Order.create({
    customerId,
    items: itemSnapshot,
    totalItems,
    subtotal,
    grandTotal,
    status: 'PLACED',
    orderStatus: 'PLACED',
    timestamps: { placedAt: new Date() },
  });

  return order;
};


const listOrders = async (customerId) => {
  const query = customerId ? { customerId } : {};
  return Order.find(query).sort({ createdAt: -1 });
};

const getOrderById = async (orderId, customerId) => {
  const query = customerId ? { _id: orderId, customerId } : { _id: orderId };
  return Order.findOne(query);
};


const updateStatus = async (orderId, nextStatus, payload = {}) => {
  if (!VALID_STATUSES.includes(nextStatus)) {
    const err = new Error('Requested status is invalid');
    err.statusCode = 400;
    throw err;
  }

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    const err = new Error('Invalid orderId');
    err.statusCode = 400;
    throw err;
  }

  const order = await Order.findById(orderId);
  if (!order) return null;

  const currentStatus = order.status;
  const allowed = allowedTransitions[currentStatus] || [];

  if (!allowed.includes(nextStatus)) {
    const err = new Error('Invalid order status transition.');
    err.statusCode = 400;
    throw err;
  }

  const tsField = statusTimestampField[nextStatus];
  const update = {
    status: nextStatus,
    orderStatus: nextStatus,
  };

  if (tsField) {
    update[`timestamps.${tsField}`] = new Date();
  }

  const updated = await Order.findByIdAndUpdate(orderId, update, { new: true });
  return updated;
};

module.exports = {
  createOrder,
  createOrderFromCart,
  listOrders,
  getOrderById,
  updateStatus,
};


