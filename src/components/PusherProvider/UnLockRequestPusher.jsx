import React, { useState } from 'react'
import Pusher from 'react-pusher'
import UnlockRequestDialog from '../Dialogs/AlertDialog/UnlockRequestDialog'
import { useSelector, useDispatch } from 'react-redux'
import { unLockAccept, unLockDecline } from '../../redux/room/actions'
const UnLockRequestPusher = () => {
  const [unlock, setUnlock] = useState(false)
  const [senderName, setSenderName] = useState('')
  const userData = useSelector((state) => state.user)
  const myIdentity = userData.identity
  const dispatch = useDispatch()
  const onUnLockRequest = (data) => {
    setSenderName(data.name)
    setUnlock(true)
  }

  const handleAgreeUnlockRequest = async () => {
    try {
      dispatch(unLockAccept({ identity: senderName }))
      setUnlock(false)
    } catch (e) {
      console.log(e)
    }
  }

  const handleDeclineUnlockRequest = () => {
    try {
      dispatch(unLockDecline({ identity: senderName }))
      setUnlock(false)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <UnlockRequestDialog
        isOpen={unlock}
        senderName={senderName}
        handleAgree={handleAgreeUnlockRequest}
        handleDecline={handleDeclineUnlockRequest}
      />

      <Pusher
        channel={`${myIdentity}-unlock`}
        event="unlock"
        onUpdate={onUnLockRequest}
      />
    </>
  )
}

export default UnLockRequestPusher
