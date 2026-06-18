import { useState } from "react";
import "../styles/chatbot.css";
import { askChatbot } from "../services/chatbotService";

function Chatbot({ setBot }) {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const ask = async () => {
    if (!question.trim()) return;

    const userMessage = question;

    // add user message
    setMessages((prev) => [
      ...prev,
      { type: "user", text: userMessage },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const res = await askChatbot(userMessage);

      setMessages((prev) => [
        ...prev,
        { type: "bot", text: res.data.answer },
      ]);
    } catch (error) {
      console.log(error);

      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      
        <div className="chat-container">
          {/* Header */}
          <div className="chat-header">
            <span>AI Assistant</span>

            <button
  className="close-btn"
  onClick={() => setBot(false)}
>
  ✖
</button>
          </div>

          {/* Chat Body */}
          <div className="chat-body">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.type === "user"
                    ? "user-message"
                    : "bot-message"
                }
              >
                {msg.text}
              </div>
            ))}

            {/* Typing animation */}
            {loading && (
              <div className="bot-message dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="chat-footer">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={(e) => {
                if (e.key === "Enter") ask();
              }}
            />

            <button onClick={ask}>➤</button>
          </div>
           </div>
  </>
  );
}

export default Chatbot;