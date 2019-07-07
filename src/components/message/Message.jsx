import React from "react";
import "./Message.scss";

const Message = props => {
  return (
    <div className="message-container">
      <img className="user-icon" src="/favicon.png" />
      <div className="message">
        <div className="message__username">{props.senderName}</div>
        <div className="message__text">{props.text}</div>
      </div>
    </div>
  );
};

export default Message;
