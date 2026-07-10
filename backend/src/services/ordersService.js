const mongoose = require('mongoose');

const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Restaurant = require('../models/Restaurant');

const VALID_STATUSES = [
  'PLACED',
  'ACCEPTED',
  'PREPARING',
  'OUT_FOR_DELIVERY',
  'DELIVERED',
  'COURIER_ASSIGNED',
  'PICKED_UP',
  'CANCELLED',
];

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
  COURIER_ASSIGNED: 'courierAssignedAt',
  PICKED_UP: 'pickedUpAt',
  DELIVERED: 'deliveredAt',
  CANCELLED: 'cancelledAt',
};

const roleAllowedStatuses = {
  restaurant_owner: ['ACCEPTED', 'PREPARING'],
  courier: ['OUT_FOR_DELIVERY', 'DELIVERED'],
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
    restaurantId: cart.restaurantId || undefined,
    items: itemSnapshot,
    totalItems,
    subtotal,
    grandTotal,
    status: 'PLACED',
    orderStatus: 'PLACED',
    timestamps: { placedAt: new Date() },
  });

  await Cart.findByIdAndUpdate(cartId, { $set: { items: [], restaurantId: null } }, { new: true });

  return order;
};

const listOrders = async (customerId) => {
  const query = customerId ? { customerId } : {};
  return Order.find(query).sort({ createdAt: -1 });
};

const listRestaurantOrders = async (restaurantId) => {
  if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
    const err = new Error('Invalid restaurantId');
    err.statusCode = 400;
    throw err;
  }

  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant) {
    const err = new Error('Restaurant not found');
    err.statusCode = 404;
    throw err;
  }

  return Order.find({ restaurantId }).sort({ createdAt: -1 });
};

const getOrderById = async (orderId, customerId) => {
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    const err = new Error('Invalid orderId');
    err.statusCode = 400;
    throw err;
  }

  const query = customerId ? { _id: orderId, customerId } : { _id: orderId };
  return Order.findOne(query);
};

const listCourierAssignedOrders = async (courierId) => {
  if (!mongoose.Types.ObjectId.isValid(courierId)) {
    const err = new Error('Invalid courierId');
    err.statusCode = 400;
    throw err;
  }

  return Order.find({ 'courier.courierId': courierId }).sort({ createdAt: -1 });
};

const getAssignedOrderById = async (orderId, courierId) => {
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    const err = new Error('Invalid orderId');
    err.statusCode = 400;
    throw err;
  }

  if (!mongoose.Types.ObjectId.isValid(courierId)) {
    const err = new Error('Invalid courierId');
    err.statusCode = 400;
    throw err;
  }

  return Order.findOne({ _id: orderId, 'courier.courierId': courierId });
};

const assignCourierToOrder = async ({ orderId, courierId, courier }) => {
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    const err = new Error('Invalid orderId');
    err.statusCode = 400;
    throw err;
  }

  if (!courierId || typeof courierId !== 'string') {
    const err = new Error('Validation error: courierId is required');
    err.statusCode = 400;
    throw err;
  }

  if (!courier || !courier.name || !courier.phone) {
    const err = new Error('Validation error: courier.name and courier.phone are required');
    err.statusCode = 400;
    throw err;
  }

  const order = await Order.findById(orderId);
  if (!order) return null;

  if (order?.courier?.courierId) {
    const err = new Error('Courier already assigned to this order');
    err.statusCode = 409;
    throw err;
  }

  const User = require('../models/User');
  const courUser = await User.findById(courierId);
  if (!courUser || courUser.role !== 'courier') {
    const err = new Error('Courier not found');
    err.statusCode = 404;
    throw err;
  }


  const updated = await Order.findByIdAndUpdate(
    orderId,
    {
      status: 'COURIER_ASSIGNED',
      orderStatus: 'COURIER_ASSIGNED',
      courier: {
        courierId,
        name: courier.name,
        phone: courier.phone,
      },
      timestamps: {
        ...(order.timestamps || {}),
        courierAssignedAt: new Date(),
      },
    },
    { new: true }
  );

  return updated;
};

const updateStatus = async (orderId, nextStatus, payload = {}, actingRole = null, actingUserId = null) => {
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

  if (actingRole && roleAllowedStatuses[actingRole] && !roleAllowedStatuses[actingRole].includes(nextStatus)) {
    const err = new Error('You are not authorized to perform this status transition.');
    err.statusCode = 403;
    throw err;
  }

  const order = await Order.findById(orderId);
  if (!order) return null;

  // Courier must be assigned for delivery lifecycle updates
  if ((nextStatus === 'OUT_FOR_DELIVERY' || nextStatus === 'DELIVERED') && actingUserId) {
    if (!order?.courier?.courierId || order.courier.courierId.toString() !== actingUserId.toString()) {
      const err = new Error('You are not authorized to update this order.');
      err.statusCode = 403;
      throw err;
    }
  }

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

  if (nextStatus === 'COURIER_ASSIGNED' && payload?.courier) {
    update.courier = payload.courier;
    if (payload?.courierAssignedAt) {
      update['timestamps.courierAssignedAt'] = payload.courierAssignedAt;
    } else {
      update['timestamps.courierAssignedAt'] = new Date();
    }
  }

  const updated = await Order.findByIdAndUpdate(orderId, update, { new: true });
  return updated;
};

module.exports = {
  createOrder,
  createOrderFromCart,
  listOrders,
  listRestaurantOrders,
  getOrderById,
  updateStatus,
  assignCourierToOrder,
  listCourierAssignedOrders,
  getAssignedOrderById,
};


