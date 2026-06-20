const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },

    customer: {
      name: { type: String, required: true, trim: true },
      phone: { type: String, required: true, trim: true },
    },

    deliveryAddress: { type: String, required: true, trim: true },

    items: [
      {
        menuItemId: { type: String, required: true, trim: true },
        name: { type: String, required: true, trim: true },
        quantity: { type: Number, required: true, min: 1 },
        unitPrice: { type: Number, required: true, min: 0 },
      },
    ],

    payment: {
      method: { type: String, required: true, enum: ['CASH', 'CARD', 'ONLINE'] },
      amount: { type: Number, required: true, min: 0 },
    },

    status: {
      type: String,
      required: true,
      enum: [
        'PLACED',
        'ACCEPTED',
        'PREPARING',
        'COURIER_ASSIGNED',
        'PICKED_UP',
        'DELIVERED',
        'CANCELLED',
      ],
      default: 'PLACED',
    },

    courier: {
      courierId: { type: String, default: null, trim: true },
      name: { type: String, default: null, trim: true },
      phone: { type: String, default: null, trim: true },
    },

    timestamps: {
      placedAt: { type: Date, default: null },
      acceptedAt: { type: Date, default: null },
      preparingAt: { type: Date, default: null },
      courierAssignedAt: { type: Date, default: null },
      pickedUpAt: { type: Date, default: null },
      deliveredAt: { type: Date, default: null },
      cancelledAt: { type: Date, default: null },
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;

