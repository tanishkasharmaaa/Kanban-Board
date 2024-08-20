const express=require("express");
const dotenv=require("dotenv")
dotenv.config()
const port=process.env.PORT||5000;
const app=express();
const connection=require("./configs/db");
const userRouter=require("./routes/user.routes")
const cors=require("cors");
const taskRouter = require("./routes/task.routes");

app.use(cors({origin:"*"}))

app.use("/user",userRouter);
app.use("/task",taskRouter);

app.listen(port,async()=>{
    try {
       await connection 
       
       console.log(`Server is running and connected to the server at port ${port}`)
    } catch (error) {
        console.log(error)
    }
})