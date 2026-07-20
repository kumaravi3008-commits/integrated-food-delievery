const express = require('express');

const restaurantController = require('../controllers/restaurantController');

const router = express.Router();

// GET /api/restaurants?search=...&location=...
router.get('/restaurants', restaurantController.listRestaurants);

// GET /api/restaurants/:id
router.get('/restaurants/:id', restaurantController.getRestaurant);

module.exports = router;

