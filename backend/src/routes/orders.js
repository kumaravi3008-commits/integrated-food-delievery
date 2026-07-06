const express = require('express');

const {
  createOrderHandler,
  createOrderFromCartHandler,
  listOrdersHandler,
  getOrderHandler,
  acceptOrderHandler,
  preparingOrderHandler,
  courierAssignedOrderHandler,
  pickedUpOrderHandler,
  deliveredOrderHandler,
  cancelledOrderHandler,
} = require('../controllers/ordersController');

const { requireAuth } = require('../middleware/authMiddleware');
const { permitRoles } = require('../middleware/rbac');

const router = express.Router();

router.post('/orders/create', requireAuth, createOrderFromCartHandler);
router.post('/orders', requireAuth, createOrderHandler);

router.get('/orders', requireAuth, listOrdersHandler);
router.get('/orders/:orderId', requireAuth, getOrderHandler);

// Courier-only status transitions
router.patch(
  '/orders/:orderId/status/ACCEPTED',
  requireAuth,
  permitRoles('courier'),
  acceptOrderHandler
);
router.patch(
  '/orders/:orderId/status/PREPARING',
  requireAuth,
  permitRoles('courier'),
  preparingOrderHandler
);
router.patch(
  '/orders/:orderId/status/COURIER_ASSIGNED',
  requireAuth,
  permitRoles('courier'),
  courierAssignedOrderHandler
);
router.patch(
  '/orders/:orderId/status/PICKED_UP',
  requireAuth,
  permitRoles('courier'),
  pickedUpOrderHandler
);
router.patch(
  '/orders/:orderId/status/DELIVERED',
  requireAuth,
  permitRoles('courier'),
  deliveredOrderHandler
);
router.patch(
  '/orders/:orderId/status/CANCELLED',
  requireAuth,
  permitRoles('courier'),
  cancelledOrderHandler
);

module.exports = router;


