const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
  {
    // Until authentication is added, we identify a user's cart by customerId.
    customerId: { type: String, required: true, trim: true },

    // Optional: allow carts scoped to a restaurant.
    restaurantId: { type: String, trim: true, default: null },

    items: [
      {
        menuItemId: { type: String, required: true, trim: true },
        name: { type: String, required: true, trim: true },
        quantity: { type: Number, required: true, min: 1, validate: (v) => Number.isInteger(v) },
        unitPrice: { type: Number, required: true, min: 0 },
      },
    ],
  },
  { timestamps: true }
);

CartSchema.index({ customerId: 1 }, { unique: true });

module.exports = mongoose.model('Cart', CartSchema);


