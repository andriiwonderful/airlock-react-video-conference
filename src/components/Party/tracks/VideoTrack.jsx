import React, { useRef, useEffect } from 'react'
import { styled } from '@material-ui/core/styles'

const Video = styled('video')({
  width: '100%',
  maxHeight: '100%',
  objectFit: 'contain',
})

export default function VideoTrack({ track, isLocal }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!track) return
    const el = ref.current
    // el.muted = true
    // if (track.setPriority && priority) {
    //   track.setPriority(priority)
    // }
    track.attach(el)
    return () => {
      track.detach(el)
      //   if (track.setPriority && priority) {
      //     // Passing `null` to setPriority will set the track's priority to that which it was published with.
      //     track.setPriority(null)
      //   }
    }
  }, [track])

  // The local video track is mirrored.
  const style = isLocal ? { transform: 'rotateY(180deg)' } : {}

  return (
    <React.Fragment>
      {track && <Video ref={ref} style={style} />}
    </React.Fragment>
  )
}
