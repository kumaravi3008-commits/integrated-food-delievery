const Restaurant = require("../models/Restaurant");
const Meal = require("../models/Meal");

const createRestaurant = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(401).json({ error: "Not authorized" });
  }
  try {
    const newRestaurant = await Restaurant.create(req.body);
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSingleRestaurant = async (req, res) => {
  const { id } = req.params;
  try {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    const meals = await Meal.find({ restaurant: id });
    res.status(200).json({ restaurant, meals });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editRestaurant = async (req, res) => {
if (req.user.role !== "admin") {
    return res.status(401).json({ error: "Not authorized" });
  }
  const { id } = req.params;
  try {
    const updated = await Restaurant.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteRestaurant = async (req, res) => {
if (req.user.role !== "admin") {
    return res.status(401).json({ error: "Not authorized" });
  }
  const { id } = req.params;
  try {
    const deleted = await Restaurant.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createRestaurant,
  getAllRestaurants,
  getSingleRestaurant,
  editRestaurant,
  deleteRestaurant,
};