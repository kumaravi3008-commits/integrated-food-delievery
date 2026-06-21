const Restaurant = require('../models/Restaurant');

const createRestaurant = async ({ name, address, phone, status }) => {
  const restaurant = await Restaurant.create({ name, address, phone, status });
  return restaurant;
};

const listRestaurants = async (filters = {}) => {
  const { search, cuisine, rating } = filters || {};

  const query = {};

  if (search && typeof search === 'string') {
    query.name = { $regex: search.trim(), $options: 'i' };
  }

  if (cuisine && typeof cuisine === 'string') {
    // Case-insensitive exact match for cuisine
    query.cuisine = { $regex: `^${cuisine.trim()}$`, $options: 'i' };
  }

  if (rating !== undefined && rating !== null) {
    query.rating = { $gte: Number(rating) };
  }


  return Restaurant.find(query);
};


const getRestaurantById = async (restaurantId) => {
  return Restaurant.findById(restaurantId);
};

const updateRestaurant = async (restaurantId, { name, address, phone, status }) => {
  return Restaurant.findByIdAndUpdate(
    restaurantId,
    { $set: { name, address, phone, status } },
    { new: true }
  );
};

const deleteRestaurant = async (restaurantId) => {
  const deleted = await Restaurant.findByIdAndDelete(restaurantId);
  return deleted;
};

module.exports = {
  createRestaurant,
  listRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
};

