import { useState, useEffect } from 'react'

export default function useIsTrackEnabled(track) {
  const [isEnabled, setIsEnabled] = useState(track ? track.isEnabled : true)

  useEffect(() => {
    setIsEnabled(track ? track.isEnabled : true)

    if (track) {
      const setEnabled = () => setIsEnabled(true)
      const setDisabled = () => setIsEnabled(false)
      track.on('enabled', setEnabled)
      track.on('disabled', setDisabled)
      return () => {
        track.off('enabled', setEnabled)
        track.off('disabled', setDisabled)
      }
    }
  }, [track])

  return isEnabled
}
