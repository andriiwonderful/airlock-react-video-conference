import React from 'react'
import Pusher from 'react-pusher'
import { useSelector, useDispatch } from 'react-redux'
import { setPinMic } from '../../redux/room/actions'
import { useSnackbar } from 'notistack'
const MicPusher = () => {
  const userData = useSelector((state) => state.user)
  const channel = `${userData.identity}-mic`
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const onMic = (data) => {
    if (data.message === 'on') {
      dispatch(setPinMic({ identity: data.name, isOn: true }))
      enqueueSnackbar(`microphone turned on with ${data.name}`, {
        variant: 'info',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      })
    } else {
      dispatch(setPinMic({ identity: data.name, isOn: false }))
      enqueueSnackbar(`microphone turned off with ${data.name}`, {
        variant: 'warning',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      })
    }
  }
  return <Pusher channel={channel} event="mic-on" onUpdate={onMic} />
}

export default MicPusher
