import React from 'react'
import Pusher from 'react-pusher'
import { useSelector, useDispatch } from 'react-redux'
import { addMessage } from '../../redux/room/actions'
import { useSnackbar } from 'notistack'

const MessagePusher = () => {
  const userData = useSelector((state) => state.user)
  const channel = `${userData.identity}-message`
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const onMessage = (data) => {
    const opp = data.name
    const msg = data.message
    dispatch(addMessage({ identity: opp, message: msg, sent: false }))
    enqueueSnackbar(`A new message from ${opp}`, {
      variant: 'info',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    })
  }
  return <Pusher channel={channel} event="message" onUpdate={onMessage} />
}

export default MessagePusher
