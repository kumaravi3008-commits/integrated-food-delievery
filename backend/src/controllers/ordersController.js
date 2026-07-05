const mongoose = require('mongoose');

const {
  createOrder,
  createOrderFromCart,
  listOrders,
  listRestaurantOrders,
  getOrderById,
  updateStatus,
} = require('../services/ordersService');
const { getRestaurantById } = require('../services/restaurantsService');

const createOrderFromCartHandler = async (req, res) => {
  const { cartId } = req.body || {};
  const customerId = req.user?.userId;

  if (!customerId) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }
  if (!cartId) {
    return res.status(400).json({ success: false, message: 'Validation error: cartId is required' });
  }

  try {
    const order = await createOrderFromCart({ customerId, cartId });
    return res.status(201).json({ success: true, message: 'Order created successfully', data: order });
  } catch (err) {
    const statusCode = err?.statusCode || 500;
    return res.status(statusCode).json({ success: false, message: err?.message || 'Internal Server Error' });
  }
};

const createOrderHandler = async (req, res) => {
  const customerId = req.user?.userId;
  const { restaurantId, customer, deliveryAddress, items, payment } = req.body || {};

  if (!customerId) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  if (!restaurantId) {
    return res.status(400).json({ success: false, message: 'Validation error: restaurantId is required' });
  }
  if (!customer || !customer.name || !customer.phone) {
    return res
      .status(400)
      .json({ success: false, message: 'Validation error: customer.name and customer.phone are required' });
  }
  if (!deliveryAddress || typeof deliveryAddress !== 'string') {
    return res.status(400).json({ success: false, message: 'Validation error: deliveryAddress is required' });
  }
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ success: false, message: 'Validation error: items must be a non-empty array' });
  }
  for (const item of items) {
    if (!item || typeof item !== 'object') {
      return res.status(400).json({ success: false, message: 'Validation error: invalid item entry' });
    }
    if (!item.menuItemId || typeof item.menuItemId !== 'string') {
      return res.status(400).json({ success: false, message: 'Validation error: item.menuItemId is required' });
    }
    if (!item.name || typeof item.name !== 'string') {
      return res.status(400).json({ success: false, message: 'Validation error: item.name is required' });
    }
    if (typeof item.quantity !== 'number' || item.quantity < 1 || !Number.isInteger(item.quantity)) {
      return res.status(400).json({ success: false, message: 'Validation error: item.quantity must be integer >= 1' });
    }
    if (typeof item.unitPrice !== 'number' || item.unitPrice < 0) {
      return res.status(400).json({ success: false, message: 'Validation error: item.unitPrice must be number >= 0' });
    }
  }

  if (!payment || !payment.method || payment.amount === undefined) {
    return res
      .status(400)
      .json({ success: false, message: 'Validation error: payment.method and payment.amount are required' });
  }
  if (!['CASH', 'CARD', 'ONLINE'].includes(payment.method)) {
    return res.status(400).json({ success: false, message: 'Validation error: payment.method invalid' });
  }
  if (typeof payment.amount !== 'number' || payment.amount < 0) {
    return res.status(400).json({ success: false, message: 'Validation error: payment.amount must be >= 0' });
  }

  try {
    const order = await createOrder({ customerId, restaurantId, customer, deliveryAddress, items, payment });
    return res.status(201).json({ success: true, data: order });
  } catch (err) {
    const statusCode = err?.statusCode || 500;
    return res.status(statusCode).json({ success: false, message: err?.message || 'Internal Server Error' });
  }
};

const listOrdersHandler = async (req, res) => {
  if (!req.user?.userId) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  const orders = await listOrders(req.user.userId);
  return res.status(200).json({ success: true, data: orders });
};

const listRestaurantOrdersHandler = async (req, res) => {
  const { restaurantId } = req.params;
  const customerId = req.user?.userId;

  if (!customerId) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }
  if (!restaurantId || !mongoose.Types.ObjectId.isValid(restaurantId)) {
    return res.status(400).json({ success: false, message: 'Validation error: restaurantId must be a valid ObjectId' });
  }

  try {
    const restaurant = await getRestaurantById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant not found' });
    }

    if (restaurant.ownerId && restaurant.ownerId.toString() !== customerId) {
      return res.status(403).json({ success: false, message: 'You are not authorized to view this restaurant orders' });
    }

    const orders = await listRestaurantOrders(restaurantId);
    return res.status(200).json({ success: true, data: orders });
  } catch (err) {
    const statusCode = err?.statusCode || 500;
    return res.status(statusCode).json({ success: false, message: err?.message || 'Internal Server Error' });
  }
};

const getOrderHandler = async (req, res) => {
  const { orderId } = req.params;

  if (!req.user?.userId) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  if (!orderId || !mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(400).json({ success: false, message: 'Validation error: orderId must be a valid ObjectId' });
  }

  try {
    const order = await getOrderById(orderId, req.user.userId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    return res.status(200).json({ success: true, data: order });
  } catch (err) {
    const statusCode = err?.statusCode || 500;
    return res.status(statusCode).json({ success: false, message: err?.message || 'Internal Server Error' });
  }
};

const transitionStatusHandler = (nextStatus) => async (req, res) => {
  const { orderId } = req.params;

  try {
    const payload = nextStatus === 'COURIER_ASSIGNED' ? req.body || {} : {};
    const updated = await updateStatus(orderId, nextStatus, payload, req.user?.role);

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    return res.status(200).json({ success: true, data: updated });
  } catch (err) {
    const statusCode = err?.statusCode || 500;
    return res.status(statusCode).json({ success: false, message: err?.message || 'Internal Server Error' });
  }
};

module.exports = {
  createOrderHandler,
  createOrderFromCartHandler,
  listOrdersHandler,
  listRestaurantOrdersHandler,
  getOrderHandler,
  acceptOrderHandler: transitionStatusHandler('ACCEPTED'),
  preparingOrderHandler: transitionStatusHandler('PREPARING'),
  courierAssignedOrderHandler: transitionStatusHandler('COURIER_ASSIGNED'),
  pickedUpOrderHandler: transitionStatusHandler('PICKED_UP'),
  outForDeliveryOrderHandler: transitionStatusHandler('OUT_FOR_DELIVERY'),
  deliveredOrderHandler: transitionStatusHandler('DELIVERED'),
  cancelledOrderHandler: transitionStatusHandler('CANCELLED'),
};

