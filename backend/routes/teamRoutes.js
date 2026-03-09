const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createTeam,
  addMember,
  getMyTeams,
  getTeamMembers,
  removeMember,
  updateTeam
} = require("../controllers/teamController");

router.post("/create", authMiddleware, createTeam);

router.post("/add-member", authMiddleware, addMember);

router.get("/my-teams", authMiddleware, getMyTeams);

router.get("/:teamId/members", authMiddleware, getTeamMembers);

router.delete("/:teamId/member/:userId", authMiddleware, removeMember);

router.put("/:teamId", authMiddleware, updateTeam);

module.exports = router;