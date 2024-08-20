const jwt=require("jsonwebtoken");
const dotenv=require("dotenv")
dotenv.config()

const adminMiddleware=(req,res,next)=>{
let token=req.headers.authorization.split(" ")[1];
if(token){
    jwt.verify(token,process.env.JWT_SECRET_KEY,function(err,decode){
        if(err){
            res.status(400).send(err)
        }
        if(decode){
            if(decode.role==='admin'){
              next()   
            }
           
        }
    })
}
}
module.exports=adminMiddleware