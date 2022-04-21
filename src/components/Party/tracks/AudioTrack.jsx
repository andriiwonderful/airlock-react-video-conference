import { useEffect } from 'react'
// import { AudioTrack as IAudioTrack } from 'twilio-video'

export default function AudioTrack({ track }) {
  useEffect(() => {
    document.body.appendChild(track.attach())
    return () => track.detach().forEach((el) => el.remove())
  }, [track])
  return null
}
