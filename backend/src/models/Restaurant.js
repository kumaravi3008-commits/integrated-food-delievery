const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    phone: { type: String, trim: true, default: null },
    status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Restaurant', RestaurantSchema);

