import React from 'react'
import Message from './Message/Message'
import { makeStyles } from '@material-ui/core'
import ScrollToBottom from 'react-scroll-to-bottom'
import { useRef } from 'react'
import { useEffect } from 'react'
const useStyles = makeStyles((theme) => ({
  messages: {
    height: '240px',
    overflowY: 'scroll',
  },
}))
const Messages = ({ messages }) => {
  const classes = useStyles()
  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }
  useEffect(scrollToBottom, [])
  useEffect(scrollToBottom, [messages])
  return (
    <div className={classes.messages}>
      <ScrollToBottom>
        {messages.map((message, i) => (
          <div>
            <Message key={i} message={message} />
          </div>
        ))}
        <div ref={messagesEndRef} />
      </ScrollToBottom>
    </div>
  )
}

export default Messages
