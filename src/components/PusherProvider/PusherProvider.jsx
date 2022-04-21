import React, { useState } from 'react'
import Pusher from 'react-pusher'
import MicPusher from './MicPusher'
import MessagePusher from './MessagePusher'
import UnLockRequestPusher from './UnLockRequestPusher'
import UnLockAcceptPusher from './UnLockAcceptPusher'
import LockRequestPusher from './LockRequestPusher'
import { useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import { setStreamUrlSuccess } from '../../redux/room/actions'
const PusherProvider = () => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const onStreamUrlChange = (data) => {
    console.log(data.message)
    dispatch(setStreamUrlSuccess(data.message))
    enqueueSnackbar(`New stream url set`, {
      variant: 'info',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    })
  }

  return (
    <>
      <Pusher
        channel="airlock-channel"
        event="stream-url-change"
        onUpdate={onStreamUrlChange}
      />

      <UnLockRequestPusher />
      <UnLockAcceptPusher />
      <LockRequestPusher />
      <MicPusher />
      <MessagePusher />
    </>
  )
}

export default PusherProvider
