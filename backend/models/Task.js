const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team"
  },

  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending"
  },

  dueDate: {
    type: Date
  }

}, { timestamps: true });

module.exports = mongoose.model("Task", TaskSchema);