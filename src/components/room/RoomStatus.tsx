import React from "react";
import "./RoomStatus.scss";

interface RoomStatusProps {
  room: {
    users: [
      {
        name: string;
      }
    ];
    name: string;
    id: string;
  };
  leaveRoom: Function;
}

export default class RoomStatus extends React.Component<RoomStatusProps> {
  constructor(props: RoomStatusProps) {
    super(props);

    this.leaveCurrentRoom = this.leaveCurrentRoom.bind(this);
  }

  leaveCurrentRoom() {
    this.props.leaveRoom(this.props.room.id);
  }

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
          <button
            className="room-status__leave rc-button"
            onClick={this.leaveCurrentRoom}
          >
            Leave
          </button>
        </div>
      );
    }
    return null;
  }
}
