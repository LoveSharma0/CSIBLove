const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();


// =============================
// REGISTER USER
// =============================
router.post("/register", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
      error: error.message
    });

  }

});


// =============================
// LOGIN USER
// =============================
router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      "SECRET_KEY",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
      error: error.message
    });

  }

});


// =============================
// PROTECTED PROFILE
// =============================
router.get("/profile", authMiddleware, (req, res) => {

  res.json({
    message: "Protected route accessed",
    user: req.user
  });

});


// =============================
// ADMIN ONLY
// =============================
router.get(
  "/admin-dashboard",
  authMiddleware,
  roleMiddleware("Admin"),
  (req, res) => {

    res.json({
      message: "Welcome Admin",
      user: req.user
    });

  }
);


// =============================
// TEAM LEADER + ADMIN
// =============================
router.get(
  "/team-dashboard",
  authMiddleware,
  roleMiddleware("Admin", "TeamLeader"),
  (req, res) => {

    res.json({
      message: "Team Leader Access",
      user: req.user
    });

  }
);


// =============================
// MEMBER ACCESS
// =============================
router.get(
  "/member-dashboard",
  authMiddleware,
  (req, res) => {

    res.json({
      message: "Member Access",
      user: req.user
    });

  }
);


module.exports = router;