const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getTaskHistory,
  verifyTask,
  deleteHistoryTask
} = require("../controllers/taskHistoryController");



router.get(
  "/",
  protect,
  getTaskHistory
);



router.put(
  "/verify/:id",
  protect,
  verifyTask
);



router.delete(
  "/delete/:id",
  protect,
  deleteHistoryTask
);



module.exports = router;