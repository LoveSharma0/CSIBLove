const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Protected dashboard
router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({
    message: "Dashboard accessed successfully",
    user: req.user
  });
});

// Protected teams
router.get("/teams", authMiddleware, (req, res) => {
  res.json({
    message: "Teams data accessed",
    user: req.user
  });
});

// Protected tasks
router.get("/tasks", authMiddleware, (req, res) => {
  res.json({
    message: "Tasks data accessed",
    user: req.user
  });
});

module.exports = router;