import { useEffect, useState } from 'react'
import useVideoPartyContext from '../useVideoPartyContext'
import { useDispatch } from 'react-redux'
import { initParticipants, participantJoined } from '../../redux/room/actions'
export default function useParticipants() {
  const { room } = useVideoPartyContext()
  //   const dominantSpeaker = useDominantSpeaker()
  const [participants, setParticipants] = useState(
    Array.from(room.participants.values()),
  )
  const dispatch = useDispatch()
  // Dispatch
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
    console.log('useEffect func called!')
  }, [room])

  useEffect(() => {
    dispatch(
      initParticipants({
        participants: Array.from(room.participants.values),
      }),
    )
    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant])
      console.log(participant.identity, '=> JOINED')
      dispatch(
        participantJoined({
          participants: Array.from(room.participants.values),
          new: participant,
        }),
      )
    }
    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant),
      )
      console.log(participant.identity, '=> EXIT')
    }
    room.on('participantConnected', participantConnected)
    room.on('participantDisconnected', participantDisconnected)
    return () => {
      room.off('participantConnected', participantConnected)
      room.off('participantDisconnected', participantDisconnected)
    }
  }, [room])

  return participants
}
