const mongoose=require("mongoose");

const taskSchema=mongoose.Schema({
    title:{type:String,require:true},
    category:{type:String,require:true},
    description:{type:String,require:true},
    status:{type:String,enum:["progress","pending","complete"],default:"pending"},
    userID:{type:mongoose.Schema.Types.ObjectId,ref:"User",require:true},
    taskDeadline:{type:Date,require:true},
    taskAddedDate:{type:Date,default:Date.now},
    completedID:{type:Date,default:null}
    
},
{versionKey:false})

const taskModel=mongoose.model("Task",taskSchema);

module.exports=taskModel;