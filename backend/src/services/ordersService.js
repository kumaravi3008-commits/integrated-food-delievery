const Order = require('../models/Order');

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
  listOrders,
  getOrderById,
  updateStatus,
};

