const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema(
  {
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: null },
    items: [
      {
        name: { type: String, required: true, trim: true },
        description: { type: String, trim: true, default: null },
        price: { type: Number, required: true, min: 0 },
      },
    ],
    status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Menu', MenuSchema);

