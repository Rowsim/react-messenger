import React from "react";
import ReactDOM from "react-dom";
import Message from "./Message";
import "./MessageList.scss";

class MessageList extends React.Component {
  componentWillUpdate() {
    const node = ReactDOM.findDOMNode(this);
    this.shouldScrollToBottom =
      node.scrollTop + node.clientHeight + 200 >= node.scrollHeight;
  }

  componentDidUpdate() {
    if (this.shouldScrollToBottom) {
      const node = ReactDOM.findDOMNode(this);
      node.scrollTop = node.scrollHeight;
    }
  }

  render() {
    if (!this.props.roomId) {
      return (
        <div className="message-list">
          <div className="message-list-noroom">
            <img className="message-list-noroom__logo" src="/favicon.png" />
            <div className="message-list-noroom__join-room">&larr; Join a room!</div>
          </div>
        </div>
      );
    }
    return (
      <div className="message-list">
        {this.props.messages.map((message, index) => {
          return (
            <Message
              key={index}
              senderName={message.sender.name}
              text={message.parts[0].payload.content}
            />
          );
        })}
      </div>
    );
  }
}

export default MessageList;
