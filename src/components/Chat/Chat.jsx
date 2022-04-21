import React from 'react'
import { makeStyles } from '@material-ui/core'
import InfoBar from './InfoBar/InfoBar'
import { useState } from 'react'
import Input from './Input/Input'
import Messages from './Messages/Messages'

const useStyles = makeStyles((theme) => ({
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    background: '#ffffff',
    borderRadius: '5px',
    height: '100%',
    width: '100%',
  },
}))

const Chat = ({ me, opponent, messages, handleSendMessage, handleClose }) => {
  const classes = useStyles()
  const [message, setMessage] = useState('')
  const sendMessage = (e) => {
    e.preventDefault()
    handleSendMessage(message)
    setMessage('')
  }
  return (
    <div className={classes.chatContainer}>
      <InfoBar room={opponent} handleClose={handleClose} />
      <Messages messages={messages} name={opponent} />
      <Input
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  )
}

export default Chat
