import { useSelector } from 'react-redux'
export default function useDJParticipant() {
  const participants = useParticipants()
  const roomData = useSelector((state) => state.room)
  const dj = roomData.dj
  const djParticipant = participants.find(
    (participant) => participant.identity === dj,
  )

  if (djParticipant) return djParticipant
  else return null
  //   const dominantSpeaker = useDominantSpeaker()
  //   const [participants, setParticipants] = useState(
  //     Array.from(room.participants.values()),
  //   )

  //   useEffect(() => {
  //     const participantConnected = (participant) => {
  //       setParticipants((prevParticipants) => [...prevParticipants, participant])
  //       console.log(participant)
  //     }
  //     const participantDisconnected = (participant) =>
  //       setParticipants((prevParticipants) =>
  //         prevParticipants.filter((p) => p !== participant),
  //       )
  //     room.on('participantConnected', participantConnected)
  //     room.on('participantDisconnected', participantDisconnected)
  //     return () => {
  //       room.off('participantConnected', participantConnected)
  //       room.off('participantDisconnected', participantDisconnected)
  //     }
  //   }, [room])
}
