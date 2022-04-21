import { useEffect, useState } from 'react'
import useVideoPartyContext from '../useVideoPartyContext'
import { initParticipants } from '../../redux/room/actions'

export default function useParticipantsEvents() {
  const { room } = useVideoPartyContext()
  //   const dominantSpeaker = useDominantSpeaker()
  const [participants, setParticipants] = useState(
    Array.from(room.participants.values()),
  )

  dispatch(
    initParticipants({
      participants: Array.from(room.participants.values()),
    }),
  )

  // When the dominant speaker changes, they are moved to the front of the participants array.
  // This means that the most recent dominant speakers will always be near the top of the
  // ParticipantStrip component.
  //   useEffect(() => {
  //     if (dominantSpeaker) {
  //       setParticipants((prevParticipants) => [
  //         dominantSpeaker,
  //         ...prevParticipants.filter(
  //           (participant) => participant !== dominantSpeaker,
  //         ),
  //       ])
  //     }
  //   }, [dominantSpeaker])

  useEffect(() => {
    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant])
      console.log(participant)
    }
    const participantDisconnected = (participant) =>
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant),
      )
    room.on('participantConnected', participantConnected)
    room.on('participantDisconnected', participantDisconnected)
    return () => {
      room.off('participantConnected', participantConnected)
      room.off('participantDisconnected', participantDisconnected)
    }
  }, [room])

  return participants
}
