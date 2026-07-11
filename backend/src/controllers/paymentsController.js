const { processPayment } = require('../services/paymentsService');

const payOrderHandler = async (req, res) => {
  const { orderId } = req.params;
  const customerId = req.user?.userId;
  const { simulate } = req.body || {};

  if (!customerId) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  try {
    const updatedOrder = await processPayment({ orderId, customerId, simulate });
    return res.status(200).json({ success: true, data: updatedOrder });
  } catch (err) {
    const statusCode = err?.statusCode || 500;
    return res.status(statusCode).json({ success: false, message: err?.message || 'Internal Server Error' });
  }
};

module.exports = {
  payOrderHandler,
};

