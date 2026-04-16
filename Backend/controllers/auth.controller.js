import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
async function registerUser(req,res) {
  
  try {
    const {name,email,password,role}=req.body;
    let existingUser=await UserModel.findOne({email})
    if(existingUser){
    return res.status(400).json({
      message:"User Already Exists"
    })
  }
  const hashedPassword=await bcrypt.hash(password,10);
  const user=await UserModel.create({name,email,password:hashedPassword,role});
  if(user){
    return res.status(201).json({
      message:"User registered successfully"
    })
  }
  } catch (error) {
    res.status(500).json({
      message:"Internal Server Error in RegisterUser"
    })
  }
}

async function loginUser(req,res) {
  try {
    const{email,password}=req.body;
    let existingUser=await UserModel.findOne({email})
    if(!existingUser){
      return res.status(401).json({
        message:"User Not Exists"
    })
  }
  const isMatch=await bcrypt.compare(password,existingUser.password)
  if(!isMatch) {
    return res.status(401).json({message:"invalid Password"})
  }
  const token=jwt.sign({
    id:existingUser._id,
    role:existingUser.role
  },process.env.JWT_SECRET,
  {expiresIn:"7d"}
)
  return res.status(200).json({
    message:"Login Successful",
    token:token
  })
  } catch (error) {
    return res.status(500).json({
      message:"Internal Server Error in LoginUser"
    })
  }
  
}

export  {registerUser,loginUser}