const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    phone: { type: String, trim: true, default: null },
    status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false, default: null },

    // Search & filtering support
    cuisine: { type: String, trim: true, default: null },
    rating: { type: Number, min: 0, default: null },

    // Geospatial discovery support (Day 4)
    // Stored as GeoJSON Point (longitude, latitude)
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        // Keep creation backwards-compatible: existing createRestaurant calls may not provide location.
        required: false,
        validate: {
          validator: function (v) {
            // Allow undefined/null/missing coordinates.
            if (v === undefined || v === null) return true;
            return Array.isArray(v) && v.length === 2 && v.every((n) => Number.isFinite(n));
          },
          message: 'location.coordinates must be [longitude, latitude]',
        },
      },
    },

  },
  { timestamps: true }
);

// 2dsphere index for $geoNear
RestaurantSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Restaurant', RestaurantSchema);





