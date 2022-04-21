import { useSelector } from 'react-redux'
import useParticipants from '../useParticipants/useParticipants'

const usePinParticipant = (pinId) => {
  const roomData = useSelector((state) => state.room)
  const pins = roomData.pins
  const participants = useParticipants()
  if (pins.length <= pinId) return null
  else {
    const pinIdentity = pins[pinId].identity
    const pinParticipant = participants.find(
      (participant) => participant.identity === pinIdentity,
    )
    console.log(pinParticipant)
    return pinParticipant
  }
}

export default usePinParticipant
