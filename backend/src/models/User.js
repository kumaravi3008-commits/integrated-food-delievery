<<<<<<< HEAD
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        fullname : {
            type:String,
            required:[true, "Fullname is required"],
            trim:true,
        },

        email: {
            type:String,
            required:[true, "Email is required"],
            trim: true,
            unique:true,
            lowercase:true,
            match:[ /^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Please enter a vaild email"]
        },

        password:{
            type:String,
            required:[true, "Password is required"],
            minlength:[6 ,"Password must be atleast 6 characters"]

        },

        phone: {
            type:String,
            required:[true, "Phone number is required"],
            match: [/^[6-9]\d{9}$/, "Please enter a valid phone number"],
        },

        role:{
            type:String,
            enum:["User", "admin"],
            default:"User",
        },

        isVerified:{
            type:Boolean,
            default:false,
        },

    },

    {
        timestamp: true,
    }
);

module.exports = mongoose.model("User", userSchema)
=======
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

>>>>>>> 5b8d4cddc28bcea85d0dd37a2c8d886722be2797
