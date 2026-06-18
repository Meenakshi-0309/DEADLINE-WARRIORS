import API from "./api";

export const askChatbot = (question) =>
  API.post("/chatbot", {
    question
  });