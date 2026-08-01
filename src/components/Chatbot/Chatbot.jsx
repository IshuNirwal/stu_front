import React, { useState } from 'react';
import './Chatbot.css';
import logo from "../../images/logo.webp"

const Chatbot = ({ onClose }) => {
    const [messages, setMessages] = useState('');
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim()) {
            setMessages([...messages, { sender: 'user', text: input }]);
            setInput('');
        }
    };

    return (
        <div className="chatbot-overlay">
            <div className="chatbot-container">
                <div className="chat-header">
                    <div className="chat-image"><img src={logo} alt=''/></div>
                    <button className="close-button" onClick={onClose}>X</button>
                </div>
                <div className="chat-body">
                </div>
                <div className="chat-footer">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message"
                    />
                    <button onClick={handleSend}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
