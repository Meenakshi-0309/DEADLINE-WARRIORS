const cron = require("node-cron");
const Task = require("../models/Task");
const sendEmail =
require("../services/emailService");

cron.schedule("0 9 * * *", async()=>{

  const tasks =
  await Task.find({
    status:"Pending"
  }).populate("user");

  const today = new Date();

  tasks.forEach(async(task)=>{

    const diffDays =
    Math.ceil(
      (task.deadline-today)/
      (1000*60*60*24)
    );

    if(
      diffDays===2 ||
      diffDays===1 ||
      diffDays===0
    ){

      await sendEmail(
        task.user.email,
        task.title,
        task.deadline
      );

    }

  });

});