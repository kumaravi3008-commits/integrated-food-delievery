const mongoose = require('mongoose');

const { createReview, listRestaurantReviews, listMyReviews } = require('../services/reviewsService');

const createReviewHandler = async (req, res) => {
  const customerId = req.user?.userId;
  const { orderId, rating, review } = req.body || {};

  if (!customerId) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  if (!orderId || !mongoose.Types.ObjectId.isValid(orderId)) {
    return res
      .status(400)
      .json({ success: false, message: 'Validation error: orderId must be a valid ObjectId' });
  }

  try {
    const created = await createReview({
      userId: customerId,
      orderId,
      rating,
      review,
    });

    return res.status(201).json({ success: true, message: 'Review created successfully', data: created });
  } catch (err) {
    const statusCode = err?.statusCode || 500;
    return res.status(statusCode).json({ success: false, message: err?.message || 'Internal Server Error' });
  }
};

const listRestaurantReviewsHandler = async (req, res) => {
  const { restaurantId } = req.params;

  if (!restaurantId || !mongoose.Types.ObjectId.isValid(restaurantId)) {
    return res
      .status(400)
      .json({ success: false, message: 'Validation error: restaurantId must be a valid ObjectId' });
  }

  try {
    const reviews = await listRestaurantReviews(restaurantId);
    return res.status(200).json({ success: true, data: reviews });
  } catch (err) {
    const statusCode = err?.statusCode || 500;
    return res.status(statusCode).json({ success: false, message: err?.message || 'Internal Server Error' });
  }
};

const listMyReviewsHandler = async (req, res) => {
  const customerId = req.user?.userId;

  if (!customerId) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  try {
    const reviews = await listMyReviews(customerId);
    return res.status(200).json({ success: true, data: reviews });
  } catch (err) {
    const statusCode = err?.statusCode || 500;
    return res.status(statusCode).json({ success: false, message: err?.message || 'Internal Server Error' });
  }
};

module.exports = {
  createReviewHandler,
  listRestaurantReviewsHandler,
  listMyReviewsHandler,
};

