const {
  assignCourierToOrder,
  updateStatus,
} = require('../ordersService');

/**
 * Helper to simulate a delivery flow for testing.
 *
 * Not intended for production use; it only calls the same underlying services
 * used by the REST endpoints.
 */
async function simulateDeliveryFlow({ orderId, courierId, courier, actingCourierUserId }) {
  // 1) assign courier (restaurant_owner flow in REST)
  const assigned = await assignCourierToOrder({ orderId, courierId, courier });
  if (!assigned) {
    const err = new Error('Order not found');
    err.statusCode = 404;
    throw err;
  }

  // 2) move to OUT_FOR_DELIVERY (courier flow)
  await updateStatus(orderId, 'OUT_FOR_DELIVERY', {}, 'courier', actingCourierUserId || courierId);

  // 3) move to DELIVERED (courier flow)
  const delivered = await updateStatus(orderId, 'DELIVERED', {}, 'courier', actingCourierUserId || courierId);

  return delivered;
}

module.exports = {
  simulateDeliveryFlow,
};

