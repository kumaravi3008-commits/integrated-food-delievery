const express = require('express');

const {
  createOrderHandler,
  createOrderFromCartHandler,
  listOrdersHandler,
  listRestaurantOrdersHandler,
  getOrderHandler,
  acceptOrderHandler,
  preparingOrderHandler,
  courierAssignedOrderHandler,
  pickedUpOrderHandler,
  outForDeliveryOrderHandler,
  deliveredOrderHandler,
  cancelledOrderHandler,
  assignCourierToOrderHandler,
  listAssignedOrdersHandler,
  getAssignedOrderHandler,
} = require('../controllers/ordersController');

const { requireAuth } = require('../middleware/authMiddleware');
const { permitRoles } = require('../middleware/rbac');

const router = express.Router();

router.post('/orders/create', requireAuth, createOrderFromCartHandler);
router.post('/orders', requireAuth, createOrderHandler);

router.post(
  '/orders/:orderId/courier/assign',
  requireAuth,
  permitRoles('restaurant_owner'),
  (req, res, next) => {
    req.body = { ...req.body, orderId: req.params.orderId };
    return assignCourierToOrderHandler(req, res, next);
  }
);

router.get('/orders', requireAuth, listOrdersHandler);
router.get('/orders/assigned', requireAuth, permitRoles('courier'), listAssignedOrdersHandler);
router.get('/orders/assigned/:orderId', requireAuth, permitRoles('courier'), getAssignedOrderHandler);

router.get('/restaurants/:restaurantId/orders', requireAuth, permitRoles('restaurant_owner'), listRestaurantOrdersHandler);
router.get('/orders/:orderId', requireAuth, getOrderHandler);

// Restaurant owner transitions
router.patch(
  '/orders/:orderId/status/ACCEPTED',
  requireAuth,
  permitRoles('restaurant_owner'),
  acceptOrderHandler
);
router.patch(
  '/orders/:orderId/status/PREPARING',
  requireAuth,
  permitRoles('restaurant_owner'),
  preparingOrderHandler
);

// Courier transitions
router.patch(
  '/orders/:orderId/status/OUT_FOR_DELIVERY',
  requireAuth,
  permitRoles('courier'),
  outForDeliveryOrderHandler
);
router.patch(
  '/orders/:orderId/status/DELIVERED',
  requireAuth,
  permitRoles('courier'),
  deliveredOrderHandler
);

// Deprecated / unsupported transitions remain protected but will reject on validation
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
  '/orders/:orderId/status/CANCELLED',
  requireAuth,
  permitRoles('courier'),
  cancelledOrderHandler
);

module.exports = router;


