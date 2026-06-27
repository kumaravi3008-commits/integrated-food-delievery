const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
    },

    passwordHash: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
      enum: ['consumer', 'restaurant_owner', 'courier'],
      default: 'consumer',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);

