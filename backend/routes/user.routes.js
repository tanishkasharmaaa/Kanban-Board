const express = require("express");
const userRouter = express.Router();
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');


const dotenv=require("dotenv").config();
const adminCount=require("../middleware/adminCount")

userRouter.use(express.json());

userRouter.post("/register",adminCount, async (req, res) => {
  let {name, email, password, role} = req.body;
 
  
  try {
 let existingUser=await UserModel.findOne({email})
 console.log(existingUser)
  if(existingUser){
res.status(400).json({message:"User already exist in the database"})
  }

  else{
    let user;
  
      bcrypt.hash(password, 6, async function (err, hash) {
        if (err) {
          res.status(400).send(err);
        }
        if (hash) {
          user = new UserModel({
            name,
            email,
            password: hash,
            role,
          });
          await user.save();
        }
      
    res.status(201).send(user);
      });
   
  }
    
  } catch (error) {
    res.status(500).json({message:"Internal server error",error});
  }
});

userRouter.post('/login',async(req,res)=>{
  let{email,password}=req.body;
  try {
    
  let user=await UserModel.findOne({email});  
     let isPasswordCoorect=  bcrypt.compare(password,user.password)
    if(!isPasswordCoorect){
res.status(400).json({message:'Invalid credentials'})
    }
    const accessToken=jwt.sign({userID:user._id,role:user.role,email},process.env.JWT_SECRET_KEY,{algorithm:'HS256'});
    res.status(200).json({message:'User login successful',accessToken})
} catch (error) {
  console.log(error);
  return res.status(500).json({message:'Internal Server Error',error});
  }
})


module.exports = userRouter;
