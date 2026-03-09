const Task = require("../models/Task");

// CREATE TASK
exports.createTask = async (req,res)=>{
try{

const {title,description,priority,deadline,team} = req.body;

const task = new Task({
title,
description,
priority,
deadline,
team,
assignedTo:req.user.id
});

await task.save();

res.status(201).json({
success:true,
message:"Task created successfully",
task
});

}catch(error){

res.status(500).json({
success:false,
message:error.message
});

}
};