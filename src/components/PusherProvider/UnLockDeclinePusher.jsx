import React from 'react'
import Pusher from 'react-pusher'
import { useSelector, useDispatch } from 'react-redux'
import { setPinUnLock } from '../../redux/room/actions'
import { useSnackbar } from 'notistack'

const UnLockDeclinePusher = () => {
  const userData = useSelector((state) => state.user)
  const channel = `${userData.identity}-unlock-decline`
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const onUnLockDecline = (data) => {
    const sender = data.name
    dispatch(setPinLock({ identity: sender }))
    enqueueSnackbar(`${data.name} declined your unlock request`, {
      variant: 'warning',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    })
  }

  return (
    <Pusher
      channel={channel}
      event="unlock-decline"
      onUpdate={onUnLockDecline}
    />
  )
}

export default UnLockDeclinePusher
