import userModel from './../models/user.model.js';
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
// ROute for userLogin
const loginUser = async(req,res)=>{

}



// Route for userRegister
const registerUser = async(req,res)=>{
   try {
    const {name,email,password} = req.body;

    // checking if user already exist
    const exists = await userModel.findOne({email});
    if(exists){
        return res.status(409).json({success:false,message: "User already exists"})
    }
    // validating email format and strong password
    if(!validator.isEmail(email)){
         return res.status(400).json({success:false,message: "Email is not valid"})
    }
    if(password.length<6){
         return res.status(400).json({success:false,message: "please enter a strong password"})
    }
    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const newUser = new userModel({
        name,
        email,
        password:hashedPassword,
    })
    const user = await newUser.save();
    const token = createToken(user._id)
    res.status(201).json({success:true,token})
   } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
    
    
   }
}



// Roite for adminLogin
const adminLogin = async(req,res)=>{

}

export {loginUser, registerUser, adminLogin}