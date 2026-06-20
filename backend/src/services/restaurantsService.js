const Restaurant = require('../models/Restaurant');

const createRestaurant = async ({ name, address, phone, status }) => {
  const restaurant = await Restaurant.create({ name, address, phone, status });
  return restaurant;
};

const listRestaurants = async () => {
  return Restaurant.find({});
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

