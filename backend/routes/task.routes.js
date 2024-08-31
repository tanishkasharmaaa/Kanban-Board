const express=require("express");
const taskModel = require("../models/task.model");
const taskRouter=express.Router();
const dotenv=require("dotenv")
dotenv.config()
const authMiddleware=require("../middleware/authMiddleware");
const jwt=require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const userMiddleware = require("../middleware/userMiddleware");



taskRouter.use(express.json())

taskRouter.get('/',authMiddleware,async(req,res)=>{
    try {
        res.status(200).send("Welcome to Kanban Board");
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Internal Server Error'});
    }
})

taskRouter.get('/allTasks',[authMiddleware,userMiddleware],async(req,res)=>{
    try {
        let token=req.headers.authorization.split(' ')[1];
        jwt.verify(token,process.env.JWT_SECRET_KEY,async function(err,decode){
      if(err){
        res.status(400).json({err:err})
      }if(decode){
        if(decode.role==="admin"){
            let tasks=await taskModel.find();
            res.status(200).send(tasks)
        }
        let tasks=await taskModel.find({userID:decode.userID});
res.status(200).json(tasks)
      }
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
})

taskRouter.get('/search',async(req,res)=>{
    let userId;
    let token=req.headers.authorization.split(" ")[1];
    jwt.verify(token,process.env.JWT_SECRET_KEY,function(err,decode){
if(err){
    res.status(400).json({err})
}
if(decode){
    userId=decode.userID
}
    })
    let{title,category,q,limit=10,page=1}=req.query;
    let filter={};
    if(title){
        filter.title=title.toLowerCase()
    }
    if(category){
        filter.category=category.toLowerCase()
    }
    if(q){
        filter.title={$regex:new RegExp(q,'i')}
    }
    try {
       let tasks=await taskModel.find({userID:userId},filter).limit(parseInt(limit)).skip((page-1)*limit) ;
       res.status(200).json(tasks)
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:'Internal Server Error',error});
    }
  
})


taskRouter.post('/addTask',[authMiddleware,userMiddleware], async (req, res) => {
    let { title, description, status, taskDeadline,category} = req.body;
    
    // Validate and format the taskDeadline
    let formattedDeadline;
    if (taskDeadline) {
        const [day, month, year] = taskDeadline.split('/');
        formattedDeadline = new Date(`${year}-${month}-${day}`);
        
        // Check if the formattedDeadline is valid
        if (isNaN(formattedDeadline.getTime())) {
            return res.status(400).json({ error: 'Invalid date format for taskDeadline' });
        }
    } else {
        return res.status(400).json({ error: 'taskDeadline is required' });
    }

    try {
        let userToken = req.headers.authorization.split(" ")[1];
        jwt.verify(userToken, process.env.JWT_SECRET_KEY, async function (err, decode) {
            if (err) {
                return res.status(400).send(err);
            }
            if (decode) {
                let tasks = new taskModel({
                    title,
                    category,
                    description,
                    status,
                    userID: decode.userID,
                    taskDeadline: formattedDeadline
                });

                await tasks.save();
                return res.status(201).json({message:"Task created successfully"});
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:'Internal Server Error',error});
    }
});

taskRouter.patch('/updateTask/:id',[authMiddleware,userMiddleware],async(req,res)=>{
   
    try {
        let task=await taskModel.findByIdAndUpdate({_id:req.params.id},req.body);
        if(!task){
            return res.status(404).json({message:"Task not found"});
        }


        if(req.body.status==='complete'){
            task.completedDate= new Date()
            new Intl.DateTimeFormat('en-GB').format(task.completedDate);
        }
      

    await task.save();
    res.status(200).json({message:"Task update successfully"})

    } catch (error) {
       
        return res.status(400).json({message:'Internal Server Error',error});
    }
})

taskRouter.delete('/deleteTask/:id',[authMiddleware,userMiddleware],async(req,res)=>{
    try {
        let task=await taskModel.findByIdAndDelete({_id:req.params.id});
        res.status(200).json({message:"Task deleted successfully"})
    } catch (error) {
        console.log(error);
       
        return res.status(500).json({message:'Internal Server Error',error});
    }
})

module.exports=taskRouter;