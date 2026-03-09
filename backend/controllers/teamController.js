const Team = require("../models/Team");


// CREATE TEAM
exports.createTeam = async (req, res) => {
  try {

    const { name, description } = req.body;

    const team = new Team({
      name,
      description,
      leader: req.user.id,
      members: [req.user.id]
    });

    await team.save();

    res.status(201).json({
      message: "Team created successfully",
      team
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
      error: error.message
    });

  }
};


// ADD MEMBER
exports.addMember = async (req, res) => {
  try {

    const { teamId, userId } = req.body;

    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({
        message: "Team not found"
      });
    }

    // prevent duplicate member
    if (team.members.includes(userId)) {
      return res.status(400).json({
        message: "User already in team"
      });
    }

    team.members.push(userId);

    await team.save();

    res.json({
      message: "Member added successfully",
      team
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
      error: error.message
    });

  }
};