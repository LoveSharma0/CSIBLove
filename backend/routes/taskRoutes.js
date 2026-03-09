const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const taskController = require("../controllers/taskController");

// CREATE TASK
router.post("/create", authMiddleware, taskController.createTask);

// ASSIGN TASK
router.put("/assign", authMiddleware, taskController.assignTask);

router.put("/status/:taskId", authMiddleware, 
taskController.updateTaskStatus);

module.exports = router;