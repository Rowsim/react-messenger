import React from "react";
import {
  ChatManager,
  TokenProvider
} from "@pusher/chatkit-client/react-native";
import Chatkit from "@pusher/chatkit-server";
import { tokenUrl, instanceLocator, key } from "../../chat-config";
import MessageList from "../../components/message/MessageList";
import SendMessageForm from "../../components/message/SendMessageForm";
import RoomList from "../../components/room/RoomList";
import NewRoomForm from "../../components/room/NewRoomForm";
import RoomStatus from "../../components/room/RoomStatus";

import "./main-chat.scss";

class MainChat extends React.Component {
  constructor() {
    super();
    this.state = {
      room: {},
      messages: [],
      joinableRooms: [],
      joinedRooms: [],
    };

    this.sendMessage = this.sendMessage.bind(this);
    this.subscribeToRoom = this.subscribeToRoom.bind(this);
    this.getRooms = this.getRooms.bind(this);
    this.createRoom = this.createRoom.bind(this);
  }

  componentDidMount() {
    this.loginGoogleUser();
      const chatManager = new ChatManager({
      instanceLocator,
      userId: this.props.location.state.googleProfile.googleId,
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

  loginGoogleUser() {
    if (this.props.location.state.googleProfile) {
      console.log(this.state);
      const chatkit = new Chatkit({
        instanceLocator: instanceLocator,
        key: key
      });

      chatkit
        .getUsers()
        .then(users => {
          users.forEach(user => {
            if (user.id === this.props.location.state.googleProfile.googleId) {
              return;
            } else {
              chatkit
                .createUser({
                  id: this.props.location.state.googleProfile.googleId,
                  name: this.props.location.state.googleProfile.name
                })
                .then(() => {
                  console.log("Google user created successfully");
                  return;
                })
                .catch(err => {
                  console.log(err);
                });
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.props.history.push({
        pathname: "/"
      });
    }
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

export default MainChat;
