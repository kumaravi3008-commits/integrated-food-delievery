const mongoose = require('mongoose');
const { getReviewSuggestionsByOrderId } = require('../services/reviewSuggestionService');

const reviewSuggestionController = {
  getSuggestionsHandler: async (req, res) => {
    const customerId = req.user?.userId;
    const { orderId } = req.params || {};

    if (!customerId) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    if (!orderId || !mongoose.Types.ObjectId.isValid(orderId)) {
      return res
        .status(400)
        .json({ success: false, message: 'Validation error: orderId must be a valid ObjectId' });
    }

    try {
      const data = await getReviewSuggestionsByOrderId({ orderId, customerId });
      return res.status(200).json({ success: true, data });
    } catch (err) {
      const statusCode = err?.statusCode || 500;
      return res.status(statusCode).json({ success: false, message: err?.message || 'Internal Server Error' });
    }
  },
};

module.exports = reviewSuggestionController;

