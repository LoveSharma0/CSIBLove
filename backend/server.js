const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection
mongoose.connect("mongodb://lovesharma9733_db_user:Love112009@ac-bg3v3fm-shard-00-00.bf4xkqw.mongodb.net:27017,ac-bg3v3fm-shard-00-01.bf4xkqw.mongodb.net:27017,ac-bg3v3fm-shard-00-02.bf4xkqw.mongodb.net:27017/?ssl=true&replicaSet=atlas-xhsrme-shard-0&authSource=admin&appName=Cluster0")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// routes
app.use("/api/auth", authRoutes);

const PORT = 5000;

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});