const mongoose = require('mongoose');
const crypto = require('crypto');

const Order = require('../models/Order');

const randBool = () => Math.random() < 0.5;

const generateMockTransactionId = () => {
  // mock UUID-like string
  return crypto.randomUUID ? crypto.randomUUID() : crypto.randomBytes(16).toString('hex');
};

const paymentStatusBySimulation = (simulate) => {
  if (!simulate) return randBool() ? 'success' : 'failure';
  if (simulate === 'success') return 'success';
  if (simulate === 'failure') return 'failure';
  // Unknown values treated as validation error (safer)
  return null;
};

const processPayment = async ({ orderId, customerId, simulate }) => {
  if (!orderId || !mongoose.Types.ObjectId.isValid(orderId)) {
    const err = new Error('Invalid orderId');
    err.statusCode = 400;
    throw err;
  }

  if (!customerId) {
    const err = new Error('Authentication required');
    err.statusCode = 401;
    throw err;
  }

  const sim = paymentStatusBySimulation(simulate);
  if (sim === null) {
    const err = new Error("simulate must be 'success' or 'failure' if provided");
    err.statusCode = 400;
    throw err;
  }

  // Ownership enforcement: only fetch order belonging to the customer
  const order = await Order.findOne({ _id: orderId, customerId });
  if (!order) {
    const err = new Error('Order not found');
    err.statusCode = 404;
    throw err;
  }

  if (order?.payment?.status === 'PAID') {
    const err = new Error('Order is already paid');
    err.statusCode = 409;
    throw err;
  }

  // Prevent paying cancelled/delivered orders (keeps lifecycle consistent)
  if (order.status === 'CANCELLED' || order.status === 'DELIVERED') {
    const err = new Error(`Cannot pay for an order in status '${order.status}'`);
    err.statusCode = 409;
    throw err;
  }

  const now = new Date();
  const transactionId = generateMockTransactionId();

  if (sim === 'success') {
    const updated = await Order.findByIdAndUpdate(
      orderId,
      {
        $set: {
          'payment.status': 'PAID',
          'payment.transactionId': transactionId,
          'payment.paidAt': now,
          'payment.failedAt': null,
          'payment.failureReason': null,
        },
      },
      { new: true }
    );

    return updated;
  }

  // failure
  const failureReason = 'SIMULATED_FAILURE';
  const updated = await Order.findByIdAndUpdate(
    orderId,
    {
      $set: {
        'payment.status': 'FAILED',
        'payment.transactionId': null,
        'payment.failedAt': now,
        'payment.failureReason': failureReason,
        'payment.paidAt': null,
      },
    },
    { new: true }
  );

  return updated;
};

module.exports = {
  processPayment,
};

