const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({

  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  title:{
    type:String,
    required:true
  },

  description:{
    type:String
  },

  deadline:{
    type:Date,
    required:true
  },


  priority:{
    type:String,
    enum:["High","Medium","Low"],
    default:"Low"
  },

  status: {
      type: String,
      enum: [
        "Completed",
        "Expired",
        "Verified Completed",
        "Overdue"
      ],
      default: "Completed"
    },

    completedAt: {
      type: Date,
      default: Date.now
    },

  // Reminder fields
  reminderSentCount:{
    type:Number,
    default:0
  },

  lastReminderSent:{
    type:Date,
    default:null
  }


},{
  timestamps:true
});


module.exports = mongoose.model("Task", taskSchema);