const express = require("express");
const userRouter = express.Router();
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');


const dotenv=require("dotenv").config();
const adminCount=require("../middleware/adminCount")

userRouter.use(express.json());

userRouter.post("/register",adminCount, async (req, res) => {
  let {name, email, password, role} = req.body;
 
  
  try {
 let existingUser=await UserModel.findOne({email})
 console.log(existingUser)
  if(existingUser){
res.send("User already exist in the database")
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
         console.log(user)
    res.status(201).send(user);
      });
   
  }
    
  } catch (error) {
    res.status(500).send("Internal server error", error);
  }
});

userRouter.post('/login',async(req,res)=>{
  let{email,password}=req.body;
  try {
    let user=await UserModel.findOne({email});   
    if(!user){
      res.status(400).send("Invalid Credentials")
    }
    else{
       bcrypt.compare(password,user.password,function(err,hash){
if(err){
  res.status(400).send(err)
}
if(hash){
  let accessToken=jwt.sign({email,role:user.role,userID:user._id },process.env.JWT_SECRET_KEY, { algorithm: 'HS256' })


  res.status(200).json({message:"User login successfully",accessToken})
    }})
    }
} catch (error) {
    console.log(error)
  }
})


module.exports = userRouter;
