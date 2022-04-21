import { useCallback } from 'react'
import useVideoPartyContext from '../useVideoPartyContext'
import useLocalTracks from '../useLocalTracks/useLocalTracks'
import { useSelector } from 'react-redux'

export default function useLocalVideoToggle() {
  const { localTracks, getLocalVideoTrack } = useLocalTracks()
  const videoTrack = localTracks.find((track) => track.name === 'camera')
  const localParticipant = useSelector((state) => state.room.localParticipant)
  const toggleVideoEnabled = useCallback(() => {
    if (videoTrack) {
      if (localParticipant) {
        const localTrackPublication = localParticipant.unpublishTrack(
          videoTrack,
        )
        // TODO: remove when SDK implements this event. See: https://issues.corp.twilio.com/browse/JSDK-2592
        localParticipant.emit('trackUnpublished', localTrackPublication)
      }
      videoTrack.stop()
    } else {
      getLocalVideoTrack().then((track) => {
        if (localParticipant) {
          localParticipant.publishTrack(track)
        }
      })
    }
  }, [videoTrack, localParticipant, getLocalVideoTrack])

  return [!!videoTrack, toggleVideoEnabled]
}
