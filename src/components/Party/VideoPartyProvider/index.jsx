import React, { createContext, useState, Children } from 'react'
import useHandleRoomDisconnectionErrors from '../../../hooks/useHandleRoomDisconnectionErrors'
import useHandleTrackPublicationFailed from '../../../hooks/useHandleTrackPublicationFailed'
import useHandleOnDisconnect from '../../../hooks/useHandleOnDisconnect'
import useRoom from '../../../hooks/useRoom/useRoom'
import useLocalTracks from '../../../hooks/useLocalTracks/useLocalTracks'
import { SelectedParticipantProvider } from '../../../hooks/useSelectedParticipant'

const connectionOptions = {
  bandwidthProfile: {
    video: {
      mode: 'collaboration',
      dominantSpeakerPriority: 'standard',
      renderDimensions: {
        high: { height: 1080, width: 1920 },
        standard: { height: 720, width: 1280 },
        low: { height: 90, width: 160 },
      },
    },
  },
  dominantSpeaker: true,
  maxAudioBitrate: 12000,
  networkQuality: { local: 1, remote: 1 },
  preferredVideoCodecs: [{ codec: 'VP8', simulcast: true }],
}

export const VideoPartyContext = createContext()

const VideoPartyProvider = ({ children }) => {
  const [error, setError] = useState(null)
  const onTwilioErrorCallback = (error) => {
    console.log(`ERROR: ${error.message}`, error)
    // onError(error)
    setError(error)
  }

  const onTwilioRoomDisconnect = () => {
    console.log('Disconnected')
  }
  const { localTracks, getLocalVideoTrack } = useLocalTracks()
  const { room, isConnecting, connect } = useRoom(
    localTracks,
    onTwilioErrorCallback,
    connectionOptions,
  )

  useHandleRoomDisconnectionErrors(room, onTwilioErrorCallback)
  useHandleTrackPublicationFailed(room, onTwilioErrorCallback)
  useHandleOnDisconnect(room, onTwilioRoomDisconnect)

  return (
    <VideoPartyContext.Provider
      value={{
        room,
        localTracks,
        getLocalVideoTrack,
        isConnecting,
        connect,
        onError: onTwilioErrorCallback,
      }}
    >
      <SelectedParticipantProvider room={room}>
        {children}
      </SelectedParticipantProvider>
    </VideoPartyContext.Provider>
  )
}

export default VideoPartyProvider
