const express = require('express');

const {
  createRestaurantHandler,
  listRestaurantsHandler,
  nearbyRestaurantsHandler,
  getRestaurantHandler,
  updateRestaurantHandler,
  deleteRestaurantHandler,
} = require('../controllers/restaurantsController');


const router = express.Router();

router.post('/restaurants', createRestaurantHandler);
router.get('/restaurants', listRestaurantsHandler);
router.get('/restaurants/nearby', nearbyRestaurantsHandler);
router.get('/restaurants/:restaurantId', getRestaurantHandler);
router.patch('/restaurants/:restaurantId', updateRestaurantHandler);
router.delete('/restaurants/:restaurantId', deleteRestaurantHandler);



module.exports = router;

