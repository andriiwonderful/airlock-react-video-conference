import React, { useState } from 'react'
import Pusher from 'react-pusher'
import { useSelector, useDispatch } from 'react-redux'
import { setPinLock } from '../../redux/room/actions'
import { useSnackbar } from 'notistack'
const LockRequestPusher = () => {
  const userData = useSelector((state) => state.user)
  const channel = `${userData.identity}-lock-request`
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const onLockRequest = (data) => {
    dispatch(setPinLock({ identity: data.name }))
    enqueueSnackbar(`${data.name} locked you`, {
      variant: 'warning',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    })
  }
  return (
    <>
      <Pusher channel={channel} event="lock" onUpdate={onLockRequest} />
    </>
  )
}

export default LockRequestPusher
