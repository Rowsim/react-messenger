import React from "react";
import "./UserCard.scss";
import letterSvg from "../../assets/images/letter.svg";
import messageSvg from "../../assets/images/message.svg";

const UserCard = props => {
  return (
    <div className="user-card">
      <div className="user-card-top">
        <img className="user-card__image" src="/favicon.png" />
        <div className="user-card__name">{props.name}</div>
      </div>
      <div className="user-card__contact">
        <a>
          <img className="user-card__contact__chat" src={messageSvg} />
        </a>
        <a>
          <img className="user-card__contact__email" src={letterSvg} />
        </a>
      </div>
    </div>
  );
};

export default UserCard;
