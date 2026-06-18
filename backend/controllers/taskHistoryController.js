const TaskHistory = require("../models/TaskHistory");

exports.getTaskHistory = async (req, res) => {
  try {
    const history = await TaskHistory.find({
      user: req.user
    }).sort({ completedAt: -1 });

    res.json(history);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};