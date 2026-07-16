const { getSocket } = require('../socket/index');

const EVENT_BY_STATUS = {
  ACCEPTED: 'ORDER_ACCEPTED',
  PREPARING: 'ORDER_PREPARING',
  OUT_FOR_DELIVERY: 'OUT_FOR_DELIVERY',
  DELIVERED: 'DELIVERED',
};

const STATUS_TIMESTAMP_FIELD = {
  PLACED: 'placedAt',
  ACCEPTED: 'acceptedAt',
  PREPARING: 'preparingAt',
  OUT_FOR_DELIVERY: 'outForDeliveryAt',
  DELIVERED: 'deliveredAt',
};

function safeGetUpdatedAt(order, eventName) {
  // Prefer the timestamp that corresponds to the order status.
  const status = order?.status;
  const tsField = STATUS_TIMESTAMP_FIELD[status];

  const ts = order?.timestamps?.[tsField];
  if (ts) return ts;

  // Fallback: use whatever is present.
  if (eventName === 'ORDER_PLACED') {
    return order?.timestamps?.placedAt || order?.createdAt || new Date();
  }

  return order?.timestamps?.deliveredAt || order?.timestamps?.outForDeliveryAt || order?.updatedAt || new Date();
}

function buildOrderPayload(order, eventName) {
  return {
    orderId: order?._id?.toString?.() || order?.orderId,
    status: order?.status,
    customerId: order?.customerId,
    restaurantId: order?.restaurantId?.toString?.() || order?.restaurantId,
    updatedAt: safeGetUpdatedAt(order, eventName),
  };
}


/**
 * Emits a scoped order update to the corresponding room: order:<orderId>
 *
 * @param {string} eventName
 * @param {import('../models/Order')} order
 */
function emitOrderUpdate(eventName, order) {
  try {
    if (!eventName) return;
    const orderId = order?._id?.toString?.() || order?.orderId;
    if (!orderId) return;

    // getSocket() throws if not initialized - guard so we don't crash REST.
    const io = typeof getSocket === 'function' ? getSocket() : null;
    if (!io) return;

    const payload = buildOrderPayload(order, eventName);

    if (!payload.orderId) return;

    io.to(`order:${orderId}`).emit(eventName, payload);
  } catch (err) {
    // Intentionally swallow errors so sockets never break REST.
    // eslint-disable-next-line no-console
    console.warn('emitOrderUpdate failed:', err?.message || err);
  }
}

function eventNameForStatus(status) {
  return EVENT_BY_STATUS[status] || null;
}

module.exports = {
  emitOrderUpdate,
  eventNameForStatus,
};

