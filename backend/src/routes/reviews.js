const express = require('express');

const { requireAuth } = require('../middleware/authMiddleware');

const {
  createReviewHandler,
  listRestaurantReviewsHandler,
  listMyReviewsHandler,
} = require('../controllers/reviewsController');

const router = express.Router();

router.post('/reviews', requireAuth, createReviewHandler);

router.get('/restaurants/:restaurantId/reviews', listRestaurantReviewsHandler);

router.get('/reviews/my', requireAuth, listMyReviewsHandler);

module.exports = router;

