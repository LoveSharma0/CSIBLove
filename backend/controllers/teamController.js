const Team = require("../models/Team");


// CREATE TEAM
exports.createTeam = async (req, res) => {
  try {

    const { teamName, description } = req.body;

    const team = new Team({
      teamName,
      description,
      leader: req.user.id,
      members: [req.user.id]
    });

    await team.save();

    res.status(201).json({
      success: true,
      message: "Team created successfully",
      team
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
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
        success: false,
        message: "Team not found"
      });
    }

    if (team.members.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "User already in team"
      });
    }

    team.members.push(userId);

    await team.save();

    res.status(200).json({
      success: true,
      message: "Member added successfully",
      team
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



// GET MY TEAMS
exports.getMyTeams = async (req, res) => {
  try {

    const userId = req.user.id;

    const teams = await Team.find({
      members: userId
    });

    res.status(200).json({
      success: true,
      teams
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



// GET TEAM MEMBERS
exports.getTeamMembers = async (req, res) => {
  try {

    const team = await Team.findById(req.params.teamId).populate("members");

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found"
      });
    }

    res.json({
      success: true,
      members: team.members
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



// REMOVE MEMBER
exports.removeMember = async (req, res) => {
  try {

    const { teamId, userId } = req.params;

    const team = await Team.findById(teamId);

    team.members = team.members.filter(
      member => member.toString() !== userId
    );

    await team.save();

    res.json({
      success: true,
      message: "Member removed"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



// UPDATE TEAM
exports.updateTeam = async (req, res) => {
  try {

    const { teamName, description } = req.body;

    const team = await Team.findByIdAndUpdate(
      req.params.teamId,
      { teamName, description },
      { new: true }
    );

    res.json({
      success: true,
      team
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};