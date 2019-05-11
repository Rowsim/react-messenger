import React from 'react'

function Message(props) {
    return (
        <div className="message">
            <div>{props.senderId}</div>
            <div>{props.text}</div>
        </div>
    )
}

export default Message