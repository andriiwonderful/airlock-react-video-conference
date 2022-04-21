import React from 'react'

import './Message.css'

const Message = ({ message }) => {
  return message.sent ? (
    <div className="messageContainer justifyEnd">
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{message.text}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{message.text}</p>
      </div>
    </div>
  )
}

export default Message
