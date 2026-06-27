const User = require("../models/User");
const bcrypt = require("bcrypt");
const validator = require("validator");


// ............... Login ...............................//

const register = async (req, res) => {
    try{
        const {name, email, password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // ----------email validation...........//

        if(!validator.isEmail(email)){
            return res.status(400).json({
                success:false,
                message:"Invalid Email"
            })
        }

        // ----------password validation---------//

        if(password.length > 6){
            return res.status(400).json({
                success:false,
                message:"Password must contain minimum 6 characters"
            });
        }

        // ----------check existing User--------//

        const existingUser = await User.findone({ email});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"Email already registered"
            });
        }

        // -----------Hash Password------------//

        const hashedPassword = await bcrypt.hash(password, 10);

        // ----------creating User--------------//

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });
        
    
        await newUser.save();

        res.status(201).json({
            success:true,
            message:"Registration Successfull"
        });
    }catch(error){
        console.log(error);

        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
};





module.exports = {register};