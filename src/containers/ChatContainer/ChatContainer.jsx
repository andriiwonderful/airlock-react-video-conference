import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { sendMessage, handleClose, closeChat } from '../../redux/room/actions'
import Chat from '../../components/Chat/Chat'

const ChatContainer = () => {
  const roomData = useSelector((state) => state.room)
  const myIdentity = useSelector((state) => state.user.identity)
  const dispatch = useDispatch()
  const chatOpponent = roomData.pins.find(
    (p) => p.identity === roomData.chatMember,
  )
  const messages = chatOpponent && chatOpponent.chats ? chatOpponent.chats : []
  const handleSendMessage = (msg) => {
    dispatch(sendMessage({ identity: roomData.chatMember, message: msg }))
  }

  const handleClose = () => {
    dispatch(closeChat())
  }
  return (
    <>
      {chatOpponent && roomData.chatOpen ? (
        <Chat
          me={myIdentity}
          opponent={chatOpponent.identity}
          messages={messages}
          handleSendMessage={handleSendMessage}
          handleClose={handleClose}
        />
      ) : null}
    </>
  )
}

export default ChatContainer
