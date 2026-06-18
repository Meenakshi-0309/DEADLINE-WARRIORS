const express = require("express");

const router = express.Router();

const protect =
require("../middleware/authMiddleware");

const {
  chat
} =
require("../controllers/chatbotController");

router.post(
  "/",
  protect,
  chat
);

module.exports = router;