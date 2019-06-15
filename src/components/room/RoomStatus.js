import React from "react";

class RoomStatus extends React.Component {
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

export default RoomStatus;
