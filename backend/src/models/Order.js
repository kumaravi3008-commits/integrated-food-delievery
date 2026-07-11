const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    // Day 8 required fields
    customerId: { type: String, required: true, trim: true },

    items: [
      {
        menuItemId: { type: String, required: true, trim: true },
        name: { type: String, required: true, trim: true },
        quantity: { type: Number, required: true, min: 1 },
        unitPrice: { type: Number, required: true, min: 0 },
      },
    ],

    totalItems: { type: Number, required: true, min: 0 },
    subtotal: { type: Number, required: true, min: 0 },
    grandTotal: { type: Number, required: true, min: 0 },

    orderStatus: { type: String, required: true, default: 'PLACED', trim: true },

    createdAt: { type: Date, required: true, default: Date.now },

    // Existing fields from earlier days (kept for compatibility)
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: false },

    customer: {
      name: { type: String, required: false, trim: true },
      phone: { type: String, required: false, trim: true },
    },

    deliveryAddress: { type: String, required: false, trim: true },

    payment: {
      method: { type: String, required: false, enum: ['CASH', 'CARD', 'ONLINE'] },
      amount: { type: Number, required: false, min: 0 },

      // Day 10 payment simulation fields
      status: {
        type: String,
        required: false,
        enum: ['PENDING', 'PAID', 'FAILED'],
        default: 'PENDING',
      },
      transactionId: { type: String, default: null, trim: true },
      paidAt: { type: Date, default: null },
      failedAt: { type: Date, default: null },
      failureReason: { type: String, default: null, trim: true },
    },

    status: {
      type: String,
      required: false,
      enum: [
        'PLACED',
        'ACCEPTED',
        'PREPARING',
        'OUT_FOR_DELIVERY',
        'DELIVERED',
        'COURIER_ASSIGNED',
        'PICKED_UP',
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
      outForDeliveryAt: { type: Date, default: null },
      courierAssignedAt: { type: Date, default: null },
      pickedUpAt: { type: Date, default: null },
      deliveredAt: { type: Date, default: null },
      cancelledAt: { type: Date, default: null },
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;


