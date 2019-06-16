import React from "react";

class SendMessageForm extends React.Component {
  constructor() {
    super();
    this.state = {
      message: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      message: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.sendMessage(this.state.message);
    this.setState({
      message: ""
    });
  }

  render() {
    return (
      <form className="send-message-form" onSubmit={this.handleSubmit}>
        <div className="send-message-form-container">
          <input
            disabled={this.props.disabled}
            onChange={this.handleChange}
            value={this.state.message}
            placeholder="Type something"
            type="text"
          />
          <button onClick={this.handleSubmit}>Send</button>
        </div>
      </form>
    );
  }
}

export default SendMessageForm;
