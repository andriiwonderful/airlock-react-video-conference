import React from 'react'
import Pusher from 'react-pusher'
import { useSelector, useDispatch } from 'react-redux'
import { setPinUnLock } from '../../redux/room/actions'
import { useSnackbar } from 'notistack'

const UnLockAcceptPusher = () => {
  const userData = useSelector((state) => state.user)
  const channel = `${userData.identity}-unlock-accept`
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const onUnLockAccept = (data) => {
    const sender = data.name
    dispatch(setPinUnLock({ identity: sender }))
    enqueueSnackbar(`${data.name} accepted your lock request`, {
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    })
  }

  return (
    <Pusher channel={channel} event="unlock-accept" onUpdate={onUnLockAccept} />
  )
}

export default UnLockAcceptPusher
