const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const { createTeam, addMember, getMyTeams } = require("../controllers/teamController");


// CREATE TEAM
router.post(
  "/create",
  authMiddleware,
  roleMiddleware("Admin", "TeamLeader"),
  createTeam
);


// ADD MEMBER
router.post(
  "/add-member",
  authMiddleware,
  roleMiddleware("Admin", "TeamLeader"),
  addMember
);
// Get My Token
router.get(
    "/My-teams",
    authMiddleware,
    getMyTeams
);

module.exports = router;