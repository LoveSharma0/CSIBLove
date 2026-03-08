const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const { createTeam } = require("../controllers/teamController");

router.post(
    "/create",
    authMiddleware,
    roleMiddleware("Admin", "TeamLeader"),
    createTeam
);

module.exports = router;