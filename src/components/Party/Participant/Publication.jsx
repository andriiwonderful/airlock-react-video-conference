import React from 'react'
import useTrack from '../../../hooks/useTrack'
import VideoTrack from '../tracks/VideoTrack'
import AudioTrack from '../tracks/AudioTrack'

export default function Publication({
  publication,
  isLocal,
  disableAudio,
  videoPriority,
}) {
  const track = useTrack(publication)

  if (!track) return null

  switch (track.kind) {
    case 'video':
      return (
        <VideoTrack
          track={track}
          priority={videoPriority}
          isLocal={track.name === 'camera' && isLocal}
        />
      )
    case 'audio':
      return disableAudio ? null : <AudioTrack track={track} />
    default:
      return null
  }
}
