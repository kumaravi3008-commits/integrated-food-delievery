const mongoose = require('mongoose');

const Order = require('../models/Order');
const Cart = require('../models/Cart');


const allowedTransitions = {
  PLACED: ['ACCEPTED', 'CANCELLED'],
  ACCEPTED: ['PREPARING', 'CANCELLED'],
  PREPARING: ['COURIER_ASSIGNED', 'CANCELLED'],
  COURIER_ASSIGNED: ['PICKED_UP'],
  PICKED_UP: ['DELIVERED'],
  DELIVERED: [],
  CANCELLED: [],
};

const statusTimestampField = {

  PLACED: 'placedAt',
  ACCEPTED: 'acceptedAt',
  PREPARING: 'preparingAt',
  COURIER_ASSIGNED: 'courierAssignedAt',
  PICKED_UP: 'pickedUpAt',
  DELIVERED: 'deliveredAt',
  CANCELLED: 'cancelledAt',
};

const createOrder = async ({ restaurantId, customer, deliveryAddress, items, payment }) => {
  const now = new Date();
  const order = await Order.create({
    restaurantId,
    customer,
    deliveryAddress,
    items,
    payment,
    status: 'PLACED',
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
    orderStatus: 'PENDING',
    createdAt: new Date(),
  });

  return order;
};


const listOrders = async () => {
  return Order.find({}).sort({ createdAt: -1 });
};

const getOrderById = async (orderId) => {
  return Order.findById(orderId);
};

const updateStatus = async (orderId, nextStatus, payload = {}) => {
  const order = await Order.findById(orderId);
  if (!order) return null;

  const currentStatus = order.status;
  const allowed = allowedTransitions[currentStatus] || [];

  if (!allowed.includes(nextStatus)) {
    const err = new Error(`Invalid status transition from ${currentStatus} to ${nextStatus}`);
    err.statusCode = 409;
    throw err;
  }

  const tsField = statusTimestampField[nextStatus];
  const update = { status: nextStatus };
  if (tsField) {
    update[`timestamps.${tsField}`] = new Date();
  }

  if (nextStatus === 'COURIER_ASSIGNED') {
    const courier = payload.courier || {};
    update.courier = {
      courierId: courier.courierId ?? null,
      name: courier.name ?? null,
      phone: courier.phone ?? null,
    };
  }

  if (nextStatus === 'CANCELLED') {
    update.courier = { courierId: null, name: null, phone: null };
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


