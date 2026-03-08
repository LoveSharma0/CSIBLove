const express = require("express");
const router = express.Router();

router.get("/dashboard", (req, res) => {
  res.json({
    message: "Protected dashboard accessed",
    user: req.user
  });
});

router.get("/profile", (req, res) => {
  res.json({
    message: "Profile accessed",
    user: req.user
  });
});

module.exports = router;