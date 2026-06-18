const Task = require("../models/Task");
const TaskHistory = require("../models/TaskHistory");

exports.getAnalytics = async (req, res) => {
  try {

    const pendingTasks = await Task.countDocuments({
      user: req.user
    });

    const completedTasks = await TaskHistory.countDocuments({
      user: req.user
    });

    res.json({
      totalTasks: pendingTasks + completedTasks,
      pendingTasks,
      completedTasks
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};