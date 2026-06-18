const mongoose = require("mongoose");

const taskHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      default: ""
    },

    deadline: {
      type: Date,
      required: true
    },

    priority: {
      type: String,
      default: "Medium"
    },

    status: {
      type: String,
      default: "Completed"
    },

    completedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "TaskHistory",
  taskHistorySchema
);