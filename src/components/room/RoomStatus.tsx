import React from "react";
import './RoomStatus.scss';

interface RoomStatusProps {
  room: {
    users: [
      {
        name: string;
      }
    ];
    name: string;
  };
}

export default class RoomStatus extends React.Component<RoomStatusProps> {
  render() {
    if (this.props.room.users) {
      return (
        <div className="room-status">
          <div className="room-status__info">
            <div>{this.props.room.name}</div>
            <div className="room-status__users">
              {this.props.room.users.map((user, index) => {
                return (
                  <div key={index} className="room-status__user">
                    {user.name + ","}
                  </div>
                );
              })}
            </div>
          </div>
          <button className="room-status__leave rc-button">Leave</button>
        </div>
      );
    }
    return null;
  }
}
