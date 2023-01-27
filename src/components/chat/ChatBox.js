import React, { useState } from 'react';

const ChatBox = ({ openButtonLabel }) => {
  const [conversation, setConversation] = useState([]);
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = event => {
    setMessage(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    setConversation(prevConversation => [...prevConversation, message]);
    setMessage('');
  };

  const renderConversation = () => {
    return conversation.map((message, index) => (
      <li key={index}>{message}</li>
    ));
  };

  return (
    <div className="chat-popup">
      <button className = "Hidden" onClick={() => setIsOpen(!isOpen)}>{openButtonLabel}</button>
      {isOpen ? <div className="chat">
        <ul className="conversation">{renderConversation()}</ul>
        <form onSubmit={handleSubmit}>
          <input type="text" value={message} onChange={handleChange} />
          <button type="submit">Send</button>
        </form>
      </div>
    : ""}
    </div> 
  );
};

export default ChatBox;
