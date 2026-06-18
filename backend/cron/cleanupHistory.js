const cron = require("node-cron");

const TaskHistory =
require("../models/TaskHistory");

cron.schedule("0 0 * * *", async () => {

  const fifteenDaysAgo =
    new Date();

  fifteenDaysAgo.setDate(
    fifteenDaysAgo.getDate() - 15
  );

  await TaskHistory.deleteMany({

    completedAt: {
      $lt: fifteenDaysAgo
    }

  });

  console.log(
    "Old history records removed"
  );

});