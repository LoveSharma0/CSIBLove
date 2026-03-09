const Task = require("../models/Task");


// CREATE TASK
exports.createTask = async (req, res) => {
try {

const { title, description, priority, deadline, team } = req.body;

const task = new Task({
title,
description,
priority,
deadline,
team,
assignedTo: req.user.id
});

await task.save();

res.status(201).json({
success: true,
message: "Task created successfully",
task
});

} catch (error) {

res.status(500).json({
success: false,
message: error.message
});

}
};



// ASSIGN TASK TO USER
exports.assignTask = async (req, res) => {
try {

const { taskId, userId } = req.body;

const task = await Task.findById(taskId);

if (!task) {
return res.status(404).json({
success: false,
message: "Task not found"
});
}

task.assignedTo = userId;

await task.save();

res.status(200).json({
success: true,
message: "Task assigned successfully",
task
});

} catch (error) {

res.status(500).json({
success: false,
message: error.message
});

}
};
// UPDATE TASK STATUS
exports.updateTaskStatus = async (req, res) => {
try {

const { taskId } = req.params;
const { status } = req.body;

const task = await Task.findById(taskId);

if (!task) {
return res.status(404).json({
success: false,
message: "Task not found"
});
}

task.status = status;

await task.save();

res.status(200).json({
success: true,
message: "Task status updated successfully",
task
});

} catch (error) {

res.status(500).json({
success: false,
message: error.message
});

}
};