const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    phone: { type: String, trim: true, default: null },
    status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' },

    // Search & filtering support
    cuisine: { type: String, trim: true, default: null },
    rating: { type: Number, min: 0, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Restaurant', RestaurantSchema);


