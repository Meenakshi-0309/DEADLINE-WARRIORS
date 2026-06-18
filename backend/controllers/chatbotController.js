const Task = require("../models/Task");
const askGemini =
require("../services/geminiService");

exports.chat = async(req,res)=>{

  const tasks =
  await Task.find({
    user:req.user
  });

  const prompt = `
  User Tasks:
  ${JSON.stringify(tasks)}

  User Question:
  ${req.body.question}

  Answer based only on tasks.
  `;

  const response =
  await askGemini(prompt);

  res.json({
    answer:response
  });
};