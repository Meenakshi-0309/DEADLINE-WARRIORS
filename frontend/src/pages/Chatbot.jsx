import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/chatbot.css";
import { askChatbot } from "../services/chatbotService";


function Chatbot({ setBot }) {

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);



  // Load previous chat history
  const loadChatHistory = async () => {

    try {

      const res = await axios.get(
        "https://deadline-warriors-1.onrender.com/api/chat-history",
        {
          headers:{
            Authorization:
            `Bearer ${localStorage.getItem("token")}`
          }
        }
      );


      if(res.data.length > 0){

        setMessages(
          res.data[0].messages
        );

      }


    } catch(error){

      console.log(
        "Chat history error:",
        error
      );

    }

  };



  useEffect(()=>{

    loadChatHistory();

  },[]);





  // Save chat message
  const saveChat = async(type,text)=>{

    try{

      await axios.post(

        "https://deadline-warriors-1.onrender.com/api/chat-history",

        {
          message:{
            type:type,
            text:text
          }
        },

        {
          headers:{
            Authorization:
            `Bearer ${localStorage.getItem("token")}`
          }
        }

      );


    }catch(error){

      console.log(
        "Chat save error:",
        error
      );

    }

  };





  const ask = async()=>{

    if(!question.trim())
      return;


    const userMessage = question;


    setMessages((prev)=>[
      ...prev,
      {
        type:"user",
        text:userMessage
      }
    ]);



    await saveChat(
      "user",
      userMessage
    );



    setQuestion("");

    setLoading(true);



    try{


      const res =
      await askChatbot(userMessage);



      const botMessage =
      res.data.answer;



      setMessages((prev)=>[
        ...prev,
        {
          type:"bot",
          text:botMessage
        }
      ]);



      await saveChat(
        "bot",
        botMessage
      );



    }catch(error){


      console.log(error);



      setMessages((prev)=>[
        ...prev,
        {
          type:"bot",
          text:"Something went wrong."
        }
      ]);


    }
    finally{

      setLoading(false);

    }

  };





  return (

    <div className="chat-container">


      <div className="chat-header">

        <span>
          AI Assistant
        </span>


        <button
          className="close-btn"
          onClick={()=>setBot(false)}
        >
          ✖
        </button>

      </div>





      <div className="chat-body">


        {messages.map((msg,index)=>(

          <div
            key={index}
            className={
              msg.type==="user"
              ?"user-message"
              :"bot-message"
            }
          >

            {msg.text}

          </div>

        ))}




        {loading && (

          <div className="bot-message dots">

            <span></span>
            <span></span>
            <span></span>

          </div>

        )}


      </div>






      <div className="chat-footer">


        <input

          value={question}

          onChange={(e)=>
            setQuestion(e.target.value)
          }

          placeholder="Type a message..."

          onKeyDown={(e)=>{

            if(e.key==="Enter")
              ask();

          }}

        />



        <button onClick={ask}>
          ➤
        </button>


      </div>



    </div>

  );

}


export default Chatbot;