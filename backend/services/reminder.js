const cron = require("node-cron");

const Task = require("../models/Task");
const User = require("../models/User");
const sendEmail = require("./emailService");


cron.schedule("59 16 * * *", async () => {

  console.log("Checking daily reminders...");

  try {

    const today = new Date();

    const twoDaysLater = new Date();
    twoDaysLater.setDate(
      today.getDate() + 2
    );


    const tasks = await Task.find({
      status: "Pending",

      deadline:{
        $gte: today,
        $lte: twoDaysLater
      },

      reminderSentCount:{
        $lt: 2
      }

    });


    for(const task of tasks){

      const user =
      await User.findById(task.user);


      if(user && user.email){

        await sendEmail(
          user.email,
          task.title,
          task.deadline
        );


        task.reminderSentCount += 1;
        task.lastReminderSent = new Date();

        await task.save();

      }

    }


  } catch(error){

    console.log(error.message);

  }

});