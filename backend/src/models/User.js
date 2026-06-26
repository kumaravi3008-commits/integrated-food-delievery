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
            enum:[user, admin],
            default:user,
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