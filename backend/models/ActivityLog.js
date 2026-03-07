const mongoose = require("mongoose");

const ActivityLogSchema = new mongoose.Schema({

  action: {
    type: String,
    required: true
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task"
  }

}, { timestamps: true });

module.exports = mongoose.model("ActivityLog", ActivityLogSchema);