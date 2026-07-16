const mongoose = require('mongoose');

const Review = require('../models/Review');
const Order = require('../models/Order');
const User = require('../models/User');

const KEYWORDS = [
  'fresh',
  'tasty',
  'delicious',
  'quality',
  'fast',
  'clean',
  'service',
  'friendly',
  'excellent',
  'recommended',
];

const calculateLengthPoints = (reviewText) => {
  const len = (reviewText || '').length;
  if (len >= 20 && len <= 49) return 5;
  if (len >= 50 && len <= 99) return 10;
  if (len >= 100) return 20;
  return 0;
};

const calculateRatingPoints = (rating) => {
  switch (Number(rating)) {
    case 5:
      return 10;
    case 4:
      return 8;
    case 3:
      return 5;
    case 2:
      return 2;
    case 1:
      return 1;
    default:
      return 0;
  }
};

const extractUniqueKeywords = (reviewText) => {
  const text = (reviewText || '').toLowerCase();

  const matched = new Set();
  for (const keyword of KEYWORDS) {
    const regex = new RegExp(`\\b${keyword}\\b`, 'i');
    if (regex.test(text)) matched.add(keyword);
  }
  return matched;
};

const calculateKeywordPoints = (reviewText) => {
  const uniqueKeywords = extractUniqueKeywords(reviewText);
  const count = uniqueKeywords.size;

  if (count >= 1 && count <= 2) return 5;
  if (count >= 3 && count <= 5) return 10;
  if (count > 5) return 15;
  return 0;
};

const calculateTotalReviewPoints = ({ reviewText, rating }) => {
  const lengthPoints = calculateLengthPoints(reviewText);
  const ratingPoints = calculateRatingPoints(rating);
  const keywordPoints = calculateKeywordPoints(reviewText);

  return lengthPoints + ratingPoints + keywordPoints;
};

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

  const totalPoints = calculateTotalReviewPoints({
    reviewText: normalizedReview,
    rating: numericRating,
  });

  // Create review first; only award points if creation succeeds.
  const created = await Review.create({
    userId,
    orderId,
    restaurantId: order.restaurantId,
    rating: numericRating,
    review: normalizedReview,
    pointsEarned: totalPoints,
    createdAt: new Date(),
  });

  const user = await User.findById(userId);
  if (user) {
    user.loyaltyPoints = (user.loyaltyPoints || 0) + totalPoints;
    await user.save();
  }

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

