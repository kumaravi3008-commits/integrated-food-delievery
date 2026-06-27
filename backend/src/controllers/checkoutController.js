const { createCheckoutFromCart } = require('../services/checkoutService');

const { assertValidObjectId } = require('../utils/validation');

const createCheckoutHandler = async (req, res) => {
  const { customerId } = req.body || {};

  try {
    // Ensure consistent customerId validation message across Cart + Checkout.
    const safeCustomerId = assertValidObjectId({ value: customerId, field: 'customerId' });

    const checkout = await createCheckoutFromCart({ customerId: safeCustomerId });
    return res.status(200).json({ success: true, data: checkout });
  } catch (err) {
    const statusCode = err?.statusCode || 500;
    const message = err?.message || 'Internal Server Error';
    return res.status(statusCode).json({ success: false, message });
  }
};

module.exports = {
  createCheckoutHandler,
};


