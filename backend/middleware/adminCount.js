const UserModel=require("../models/user.model")

const adminCount=async(req,res,next)=>{

    let user=await UserModel.find();
let count=0
    user.map((ele)=>{
        if(ele.role=='admin'){
count++
        }
    })
  
    if(count>1){
 res.json({message:"Admin already here"})
    }
   else{
    next()
   }
}

module.exports=adminCount