import React, { useState } from "react";
import "../css/Common.css";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { IoCall } from "react-icons/io5";

// Import your chatbot icon here
import { AiOutlineRobot } from "react-icons/ai"; // Example chatbot icon
import Chatbot from "./Chatbot/Chatbot";

const ChatButton = () => {
  const [isChatbotVisible, setChatbotVisible] = useState(false);

  const toggleChatbot = () => {
    setChatbotVisible(!isChatbotVisible);
  };

  const closeChatbot = () => {
    setChatbotVisible(false);
  };

  return (
    <>
      <div className="chat_icon_link">
        {/* <Link title="Chat on WhatsApp">
          <div className="chat_icon_container">
            <FaWhatsapp className="chat_icon" />
          </div>
        </Link> */}
        {/* <Link  title="Call us">
          <div className="chat_icon_container mt15">
            <IoCall className="call_icon" />
          </div>
        </Link> */}
        {/* <Link target="_blank"to="tel:9289877932" title="Call us">
          <div className="chat_icon_container mt15">
            <IoCall className="call_icon" />
          </div>
        </Link> */}
        {/* <div onClick={toggleChatbot} title="Chat with us">
          <div className="chat_icon_container mt15">
            <AiOutlineRobot className="chat_icon" /> 
          </div>
        </div> */}
      </div>
      {/* {isChatbotVisible && <Chatbot onClose={closeChatbot} />} */}
    </>
  );
};

export default ChatButton;
