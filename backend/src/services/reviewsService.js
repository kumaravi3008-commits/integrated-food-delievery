const mongoose = require('mongoose');

const Review = require('../models/Review');
const Order = require('../models/Order');

const createReview = async ({ userId, orderId, rating, review }) => {
  if (!userId) {
    const err = new Error('Authentication required');
    err.statusCode = 401;
    throw err;
  }

  if (!orderId || !mongoose.Types.ObjectId.isValid(orderId)) {
    const err = new Error('Validation error: orderId must be a valid MongoDB ObjectId');
    err.statusCode = 400;
    throw err;
  }

  const numericRating = Number(rating);
  if (!Number.isFinite(numericRating) || numericRating < 1 || numericRating > 5) {
    const err = new Error('Validation error: rating must be a number between 1 and 5');
    err.statusCode = 400;
    throw err;
  }

  const normalizedReview = typeof review === 'string' ? review.trim() : '';
  if (!normalizedReview) {
    const err = new Error('Validation error: review text cannot be empty');
    err.statusCode = 400;
    throw err;
  }

  // Ensure order exists AND belongs to this customer
  const order = await Order.findOne({ _id: orderId, customerId: userId });
  if (!order) {
    const err = new Error('Order not found');
    err.statusCode = 404;
    throw err;
  }

  if (order.status !== 'DELIVERED') {
    const err = new Error('Validation error: order must be delivered before leaving a review');
    err.statusCode = 400;
    throw err;
  }

  if (!order.restaurantId) {
    const err = new Error('Validation error: order does not have a restaurantId');
    err.statusCode = 400;
    throw err;
  }

  const existing = await Review.findOne({ orderId });
  if (existing) {
    const err = new Error('Review already exists for this order');
    err.statusCode = 409;
    throw err;
  }

  const created = await Review.create({
    userId,
    orderId,
    restaurantId: order.restaurantId,
    rating: numericRating,
    review: normalizedReview,
    createdAt: new Date(),
  });

  return created;
};

const listRestaurantReviews = async (restaurantId) => {
  if (!restaurantId || !mongoose.Types.ObjectId.isValid(restaurantId)) {
    const err = new Error('Validation error: restaurantId must be a valid MongoDB ObjectId');
    err.statusCode = 400;
    throw err;
  }

  return Review.find({ restaurantId }).sort({ createdAt: -1 });
};

const listMyReviews = async (userId) => {
  if (!userId) {
    const err = new Error('Authentication required');
    err.statusCode = 401;
    throw err;
  }

  return Review.find({ userId }).sort({ createdAt: -1 });
};

module.exports = {
  createReview,
  listRestaurantReviews,
  listMyReviews,
};

