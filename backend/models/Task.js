const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
{
title: {
type: String,
required: true
},

description: {
type: String
},

priority: {
type: String,
enum: ["Low","Medium","High"],
default: "Medium"
},

deadline: {
type: Date
},

team: {
type: mongoose.Schema.Types.ObjectId,
ref: "Team",
required: true
},

assignedTo: {
type: mongoose.Schema.Types.ObjectId,
ref: "User"
},

status: {
type: String,
enum: ["Pending","In Progress","Completed"],
default: "Pending"
}

},
{ timestamps:true }
);

module.exports = mongoose.model("Task", taskSchema);