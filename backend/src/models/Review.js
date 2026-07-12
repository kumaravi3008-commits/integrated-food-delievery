const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true, trim: true },
    createdAt: { type: Date, required: true, default: Date.now },
  },
  { timestamps: false }
);

ReviewSchema.index({ orderId: 1 }, { unique: true });

ReviewSchema.index({ restaurantId: 1, createdAt: -1 });
ReviewSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Review', ReviewSchema);

