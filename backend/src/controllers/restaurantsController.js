const {
  createRestaurant,
  listRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  nearbyRestaurants,
} = require('../services/restaurantsService');


const createRestaurantHandler = async (req, res) => {
  const { name, address, phone, status, location } = req.body || {};


  if (!name || typeof name !== 'string') {
    return res.status(400).json({ success: false, message: 'Validation error: name is required' });
  }
  if (!address || typeof address !== 'string') {
    return res.status(400).json({ success: false, message: 'Validation error: address is required' });
  }
  if (status && !['ACTIVE', 'INACTIVE'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Validation error: status must be ACTIVE or INACTIVE' });
  }

  const restaurant = await createRestaurant({
    name,
    address,
    phone: phone ?? null,
    status,
    location,
    ownerId: req.user?.userId || null,
  });

  return res.status(201).json({ success: true, data: restaurant });
};

const listRestaurantsHandler = async (req, res) => {
  const { search, cuisine, rating } = req.query || {};

  // Validate rating (must be a non-negative number if provided)
  if (rating !== undefined) {
    const ratingNum = Number(rating);
    if (!Number.isFinite(ratingNum) || ratingNum < 0) {
      return res.status(400).json({ success: false, message: 'Validation error: rating must be a non-negative number' });
    }
  }

  const restaurants = await listRestaurants({ search, cuisine, rating });

  return res.status(200).json({ success: true, data: restaurants });
};

const nearbyRestaurantsHandler = async (req, res) => {

  const { lat, lng, radius, cuisine, rating } = req.query || {};

  // Required: lat, lng, radius (Day 3 spec)

  if (lat === undefined) {
    return res.status(400).json({ success: false, message: 'Validation error: lat is required' });
  }
  if (lng === undefined) {
    return res.status(400).json({ success: false, message: 'Validation error: lng is required' });
  }
  if (radius === undefined) {
    return res.status(400).json({ success: false, message: 'Validation error: radius is required' });
  }

  const latitudeNum = Number(lat);
  const longitudeNum = Number(lng);
  const radiusNum = Number(radius);

  if (!Number.isFinite(latitudeNum)) {
    return res.status(400).json({ success: false, message: 'Validation error: lat must be numeric' });
  }
  if (latitudeNum < -90 || latitudeNum > 90) {
    return res.status(400).json({ success: false, message: 'Validation error: lat must be between -90 and 90' });
  }

  if (!Number.isFinite(longitudeNum)) {
    return res.status(400).json({ success: false, message: 'Validation error: lng must be numeric' });
  }
  if (longitudeNum < -180 || longitudeNum > 180) {
    return res.status(400).json({ success: false, message: 'Validation error: lng must be between -180 and 180' });
  }

  if (!Number.isFinite(radiusNum)) {
    return res.status(400).json({ success: false, message: 'Validation error: radius must be numeric' });
  }
  if (radiusNum <= 0) {
    return res.status(400).json({ success: false, message: 'Validation error: radius must be a positive number (meters)' });
  }

  // Optional filters
  let cuisineFilter = null;
  if (cuisine !== undefined) {
    if (typeof cuisine !== 'string' || !cuisine.trim()) {
      return res.status(400).json({ success: false, message: 'Validation error: cuisine must be a string' });
    }
    cuisineFilter = cuisine.trim();
  }

  let ratingFilter = null;
  if (rating !== undefined) {
    const ratingNum = Number(rating);
    if (!Number.isFinite(ratingNum) || ratingNum < 0) {
      return res.status(400).json({ success: false, message: 'Validation error: rating must be a non-negative number' });
    }
    ratingFilter = ratingNum;
  }





  const restaurants = await nearbyRestaurants({

    longitude: longitudeNum,
    latitude: latitudeNum,
    radius: radiusNum,
    cuisine: cuisineFilter,
    rating: ratingFilter,
  });

  return res.status(200).json({ success: true, data: restaurants });
};

const getRestaurantHandler = async (req, res) => {
  const { restaurantId } = req.params;
  const restaurant = await getRestaurantById(restaurantId);

  if (!restaurant) {
    return res.status(404).json({ success: false, message: 'Restaurant not found' });
  }

  return res.status(200).json({ success: true, data: restaurant });
};

const updateRestaurantHandler = async (req, res) => {
  const { restaurantId } = req.params;
  const { name, address, phone, status } = req.body || {};

  if (status && !['ACTIVE', 'INACTIVE'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Validation error: status must be ACTIVE or INACTIVE' });
  }

  const updated = await updateRestaurant(restaurantId, {
    name,
    address,
    phone: phone ?? null,
    status,
  });

  if (!updated) {
    return res.status(404).json({ success: false, message: 'Restaurant not found' });
  }

  return res.status(200).json({ success: true, data: updated });
};

const deleteRestaurantHandler = async (req, res) => {
  const { restaurantId } = req.params;

  const deleted = await deleteRestaurant(restaurantId);
  if (!deleted) {
    return res.status(404).json({ success: false, message: 'Restaurant not found' });
  }

  return res.status(200).json({ success: true, data: { restaurantId: deleted._id } });
};

module.exports = {
  createRestaurantHandler,
  listRestaurantsHandler,
  nearbyRestaurantsHandler,
  getRestaurantHandler,
  updateRestaurantHandler,
  deleteRestaurantHandler,
};


