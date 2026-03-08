const Team = require("../models/Team");

exports.createTeam = async (req, res) => {
  try {
    const { teamName, description } = req.body;

    const team = new Team({
      name,
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