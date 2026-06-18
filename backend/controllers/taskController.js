const Task = require("../models/Task");
const TaskHistory = require("../models/TaskHistory");

const calculatePriority =
require("../services/priorityService");

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