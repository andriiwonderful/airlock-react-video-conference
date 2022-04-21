import useSelectedParticipant from '../useSelectedParticipant'
import useDominantSpeaker from '../useDominantSpeaker'
import useParticipants from '../useParticipants/useParticipants'
import useVideoPartyContext from '../useVideoPartyContext'

export default function useMainSpeaker() {
  const [selectedParticipant] = useSelectedParticipant()
  const dominantSpeaker = useDominantSpeaker()
  const participants = useParticipants()
  const {
    room: { localParticipant },
  } = useVideoPartyContext()

  // The participant that is returned is displayed in the main video area. Changing the order of the following
  // variables will change the how the main speaker is determined.
  return (
    selectedParticipant ||
    dominantSpeaker ||
    participants[0] ||
    localParticipant
  )
}
