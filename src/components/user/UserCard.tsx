import React from "react";
import "./UserCard.scss";

const UserCard = props => {
  return (
    <div className="user-card">
      <div className="user-card-top">
        <img className="user-card__image" src="/favicon.png" />
        <div className="user-card__name">Name</div>
      </div>
      <div className="user-card__contact">
        <div className="user-card__contact__chat">chat</div>
        <div className="user-card__contact__email">email</div>
      </div>
    </div>
  );
};

export default UserCard;
