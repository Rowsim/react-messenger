import React from "react";
import './NewRoomForm.scss';

class NewRoomForm extends React.Component {
  constructor() {
    super();
    this.state = {
      roomName: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      roomName: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createRoom(this.state.roomName);
    this.setState({ roomName: "" });
  }

  render() {
    return (
      <div className="new-room-form">
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.roomName}
            onChange={this.handleChange}
            type="text"
            placeholder="Room name"
            required
          />
          <button id="create-room-btn" className="rc-button" type="submit">
            Create
          </button>
        </form>
      </div>
    );
  }
}

export default NewRoomForm;
