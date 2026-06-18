require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/database");


// Routes
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");
const taskHistoryRoutes = require("./routes/taskHistoryRoutes");
const chatHistoryRoutes = require("./routes/chatHistoryRoutes");


// Start reminder scheduler
require("./services/reminder");


// Connect Database
connectDB();


const app = express();


// Middleware
app.use(
  cors({
    origin:"http://localhost:5173",
    credentials:true
  })
);

app.use(express.json());


// API Routes

app.use(
  "/api/auth",
  authRoutes
);


app.use(
  "/api/tasks",
  taskRoutes
);


app.use(
  "/api/analytics",
  analyticsRoutes
);


app.use(
  "/api/chatbot",
  chatbotRoutes
);


app.use(
  "/api/history",
  taskHistoryRoutes
);


// Chatbot stored history
app.use(
  "/api/chat-history",
  chatHistoryRoutes
);



// Server

const PORT =
process.env.PORT || 5000;


app.listen(PORT,()=>{

 console.log(
  `Server running on ${PORT}`
 );

});