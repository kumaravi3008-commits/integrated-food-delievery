const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  cuisine: String,
  image: String,
  address: String,
  rating: { type: Number, default: 0 },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;