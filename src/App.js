import React from "react";
import {
  ChatManager,
  TokenProvider
} from "@pusher/chatkit-client/react-native";
import { tokenUrl, instanceLocator } from "./config";
import MessageList from "./components/message/MessageList";
import SendMessageForm from "./components/message/SendMessageForm";
import RoomList from "./components/room/RoomList";
import NewRoomForm from "./components/room/NewRoomForm";
import RoomStatus from "./components/room/RoomStatus";

import "./style.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      room: {},
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    };

    this.sendMessage = this.sendMessage.bind(this);
    this.subscribeToRoom = this.subscribeToRoom.bind(this);
    this.getRooms = this.getRooms.bind(this);
    this.createRoom = this.createRoom.bind(this);
  }

  componentDidMount() {
    const chatManager = new ChatManager({
      instanceLocator,
      userId: "ckTest1",
      tokenProvider: new TokenProvider({ url: tokenUrl })
    });

    chatManager
      .connect()
      .then(currentUser => {
        console.log("Successful connection", currentUser);
        this.currentUser = currentUser;
        this.getRooms();
      })
      .catch(err => console.log("Error on connection", err));
  }

  subscribeToRoom(roomId) {
    this.setState({ messages: [] });
    this.currentUser
      .subscribeToRoomMultipart({
        roomId,
        hooks: {
          onMessage: message => {
            this.setState({
              messages: [...this.state.messages, message]
            });
          }
        }
      })
      .then(room => {
        this.setState({
          room
        });
        this.getRooms();
      })
      .catch(err => console.log("error on subscribing to room: ", err));
  }

  getRooms() {
    this.currentUser
      .getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
        });
      })
      .catch(err => console.log("Error on joinableRooms: ", err));
  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: this.state.room.id
    });
  }

  createRoom(name) {
    this.currentUser
      .createRoom({
        name
      })
      .then(room => {
        this.subscribeToRoom(room.id);
      })
      .catch(err => console.log("Error on create room", err));
  }

  render() {
    return (
      <div className="app">
        <div className="content-side">
          <RoomList
            subscribeToRoom={this.subscribeToRoom}
            rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
            roomId={this.state.room.id}
          />
          <NewRoomForm createRoom={this.createRoom} />
        </div>
        <div className="content-main">
          <RoomStatus room={this.state.room} />
          <MessageList
            messages={this.state.messages}
            roomId={this.state.room.id}
          />
          <SendMessageForm
            disabled={!this.state.room.id}
            sendMessage={this.sendMessage}
          />
        </div>
      </div>
    );
  }
}

export default App;
