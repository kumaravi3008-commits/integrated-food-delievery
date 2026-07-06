const express = require('express');

const {
  createRestaurantHandler,
  listRestaurantsHandler,
  nearbyRestaurantsHandler,
  getRestaurantHandler,
  updateRestaurantHandler,
  deleteRestaurantHandler,
} = require('../controllers/restaurantsController');

const { requireAuth } = require('../middleware/authMiddleware');
const { permitRoles } = require('../middleware/rbac');

const router = express.Router();

router.post(
  '/restaurants',
  requireAuth,
  permitRoles('restaurant_owner'),
  createRestaurantHandler
);
router.get('/restaurants', listRestaurantsHandler);
router.get('/restaurants/nearby', nearbyRestaurantsHandler);
router.get('/restaurants/:restaurantId', getRestaurantHandler);
router.patch(
  '/restaurants/:restaurantId',
  requireAuth,
  permitRoles('restaurant_owner'),
  updateRestaurantHandler
);
router.delete(
  '/restaurants/:restaurantId',
  requireAuth,
  permitRoles('restaurant_owner'),
  deleteRestaurantHandler
);

module.exports = router;


