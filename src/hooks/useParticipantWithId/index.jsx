import useParticipants from '../useParticipants/useParticipants'
export default function useParticipantWithId(participantId) {
  const participants = useParticipants()
  const participant = participants.find(
    (participant) => participant.identity === participantId,
  )

  if (participant) return participant
  else return null
}
