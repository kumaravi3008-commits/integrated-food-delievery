const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true },
  category: { type: String, default: '' },
  image: { type: String, default: '' },
}, { _id: false });

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Restaurant name is required'],
    trim: true,
    index: true,
  },
  cuisine: {
    type: [String],
    required: [true, 'At least one cuisine type is required'],
    index: true,
  },
  address: {
    type: String,
    trim: true,
    default: '',
  },
  location: {
    type: String,
    trim: true,
    default: '',
    index: true,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  priceTier: {
    type: String,
    enum: ['$', '$$', '$$$', '$$$$'],
    default: '$$',
  },
  etaMins: {
    type: Number,
    default: 30,
  },
  isOpen: {
    type: Boolean,
    default: true,
  },
  type: {
    type: String,
    enum: ['delivery', 'dine-in', 'both'],
    default: 'delivery',
    index: true,
  },
  image: {
    type: String,
    default: '',
  },
  items: [menuItemSchema],
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Text index for efficient full-text search across name, cuisine, and items
restaurantSchema.index({ name: 'text', cuisine: 'text', 'items.name': 'text' });

module.exports = mongoose.model('Restaurant', restaurantSchema);

