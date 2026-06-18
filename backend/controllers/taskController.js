const Task = require("../models/Task");
const TaskHistory = require("../models/TaskHistory");
const calculatePriority = require("../services/priorityService");

exports.createTask = async (req, res) => {

  try {

    const priority =
      calculatePriority(req.body.deadline);

    const task =
      await Task.create({

        user: req.user,
        title: req.body.title,
        description: req.body.description,
        deadline: req.body.deadline,
        priority

      });

    res.status(201).json(task);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.getTasks = async (req, res) => {

  try {

    const search =
      req.query.search || "";

    const status =
      req.query.status || "";

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find expired tasks
    const expiredTasks = await Task.find({
      user: req.user,
      deadline: { $lt: today }
    });

    // Move expired tasks to history
    for (const task of expiredTasks) {

      await TaskHistory.create({

        user: task.user,
        title: task.title,
        description: task.description,
        deadline: task.deadline,
        priority: task.priority,
        status: "Expired"

      });

      await Task.findByIdAndDelete(task._id);
    }

    let query = {
      user: req.user
    };

    if (search) {

      query.title = {
        $regex: search,
        $options: "i"
      };

    }

    if (status) {

      query.status = status;

    }

    const tasks =
      await Task.find(query)
      .sort({ deadline: 1 });

    res.json(tasks);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.updateTask = async (req, res) => {

  try {

    const task =
      await Task.findById(req.params.id);

    if (!task) {

      return res.status(404).json({
        message: "Task not found"
      });

    }

    task.title =
      req.body.title || task.title;

    task.description =
      req.body.description ||
      task.description;

    task.deadline =
      req.body.deadline ||
      task.deadline;

    task.priority =
      calculatePriority(task.deadline);

    const updatedTask =
      await task.save();

    res.json(updatedTask);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.deleteTask = async (req, res) => {

  try {

    const task =
      await Task.findById(req.params.id);

    if (!task) {

      return res.status(404).json({
        message: "Task not found"
      });

    }

    await Task.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Task deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.completeTask = async (req, res) => {

  try {

    const task =
      await Task.findById(req.params.id);

    if (!task) {

      return res.status(404).json({
        message: "Task not found"
      });

    }

    task.status = "Completed";

    await task.save();

    await TaskHistory.create({

      user: task.user,
      title: task.title,
      description: task.description,
      deadline: task.deadline,
      priority: task.priority,
      status: "Completed"

    });

    await Task.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
      "Task moved to history"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};