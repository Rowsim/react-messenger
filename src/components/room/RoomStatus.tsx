import React from "react";

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
          <div className="room-status-info">
            <div>{this.props.room.name}</div>
            <div className="room-status-users">
              {this.props.room.users.map((user, index) => {
                return (
                  <div key={index} className="room-status-user">
                    {user.name + ","}
                  </div>
                );
              })}
            </div>
          </div>
          <div>Leave</div>
        </div>
      );
    }
    return null;
  }
}
