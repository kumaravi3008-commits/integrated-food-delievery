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
  const { longitude, latitude, radius } = req.query || {};

  const longitudeNum = Number(longitude);
  const latitudeNum = Number(latitude);
  const radiusNum = Number(radius);

  if (!Number.isFinite(latitudeNum) || latitudeNum < -90 || latitudeNum > 90) {
    return res.status(400).json({ success: false, message: 'Validation error: latitude must be a number between -90 and 90' });
  }
  if (!Number.isFinite(longitudeNum) || longitudeNum < -180 || longitudeNum > 180) {
    return res.status(400).json({ success: false, message: 'Validation error: longitude must be a number between -180 and 180' });
  }
  if (!Number.isFinite(radiusNum) || radiusNum <= 0) {
    return res.status(400).json({ success: false, message: 'Validation error: radius must be a positive number (meters)' });
  }

  const restaurants = await nearbyRestaurants({
    longitude: longitudeNum,
    latitude: latitudeNum,
    radius: radiusNum,
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


