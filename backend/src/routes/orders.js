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


const router = express.Router();

router.post('/orders/create', createOrderFromCartHandler);
router.post('/orders', createOrderHandler);


router.get('/orders', listOrdersHandler);
router.get('/orders/:orderId', getOrderHandler);

router.patch('/orders/:orderId/status/ACCEPTED', acceptOrderHandler);
router.patch('/orders/:orderId/status/PREPARING', preparingOrderHandler);
router.patch('/orders/:orderId/status/COURIER_ASSIGNED', courierAssignedOrderHandler);
router.patch('/orders/:orderId/status/PICKED_UP', pickedUpOrderHandler);
router.patch('/orders/:orderId/status/DELIVERED', deliveredOrderHandler);
router.patch('/orders/:orderId/status/CANCELLED', cancelledOrderHandler);

module.exports = router;

