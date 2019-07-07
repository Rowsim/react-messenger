import React from "react";
import "./Message.scss";
import UserCard from "../user/UserCard";

const Message = props => {
  const avatarUrl = props.senderAvatar ? props.senderAvatar : "/favicon.png";
  return (
    <div className="message-container">
      <img className="user-icon" src={avatarUrl} />
      <div className="message">
        <button className="message__username button-link">
          {props.senderName}
        </button>
        <UserCard name={props.senderName} avatarUrl={avatarUrl} />
        <div className="message__text">{props.text}</div>
      </div>
    </div>
  );
};

export default Message;
