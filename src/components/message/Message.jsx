import React from "react";
import "./Message.scss";
import UserCard from "../user/UserCard";

const Message = props => {
  return (
    <div className="message-container">
      <img className="user-icon" src="/favicon.png" />
      <div className="message">
        <UserCard />
        <a className="message__username">{props.senderName}</a>
        <div className="message__text">{props.text}</div>
      </div>
    </div>
  );
};

export default Message;
