const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const teamRoutes = require("./routes/teamRoutes");

// Middleware
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/teams", teamRoutes);


app.use("/api", authMiddleware, protectedRoutes);




app.get("/", (req, res) => {
  res.send("TaskFlow API is running");
});



const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});