const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Routes
const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");

// Middleware
const authMiddleware = require("./middleware/authMiddleware");

const app = express();


// ==============================
// GLOBAL MIDDLEWARE
// ==============================

app.use(cors());
app.use(express.json());


// ==============================
// DATABASE CONNECTION
// ==============================

mongoose.connect("mongodb://lovesharma9733_db_user:Love9733@ac-bg3v3fm-shard-00-00.bf4xkqw.mongodb.net:27017,ac-bg3v3fm-shard-00-01.bf4xkqw.mongodb.net:27017,ac-bg3v3fm-shard-00-02.bf4xkqw.mongodb.net:27017/?ssl=true&replicaSet=atlas-xhsrme-shard-0&authSource=admin&appName=Cluster0")

.then(() => {
  console.log("MongoDB Connected");
})

.catch((error) => {
  console.log("MongoDB Connection Error:", error);
});


// ==============================
// PUBLIC ROUTES
// ==============================

app.use("/api/auth", authRoutes);


// ==============================
// PROTECTED ROUTES
// ==============================

app.use("/api", authMiddleware, protectedRoutes);


// ==============================
// ROOT TEST ROUTE
// ==============================

app.get("/", (req, res) => {
  res.send("TaskFlow API is running");
});


// ==============================
// SERVER START
// ==============================

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});