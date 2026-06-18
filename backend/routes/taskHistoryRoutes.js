const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const TaskHistory = require("../models/TaskHistory");

router.get("/", protect, async (req, res) => {
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
});

module.exports = router;