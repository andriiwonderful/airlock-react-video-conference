import { useEffect, useState } from 'react'

export default function useParticipantNetworkQualityLevel(participant) {
  const [networkQualityLevel, setNetworkQualityLevel] = useState(
    participant.networkQualityLevel,
  )

  useEffect(() => {
    const handleNewtorkQualityLevelChange = (newNetworkQualityLevel) =>
      setNetworkQualityLevel(newNetworkQualityLevel)

    setNetworkQualityLevel(participant.networkQualityLevel)
    participant.on(
      'networkQualityLevelChanged',
      handleNewtorkQualityLevelChange,
    )
    return () => {
      participant.off(
        'networkQualityLevelChanged',
        handleNewtorkQualityLevelChange,
      )
    }
  }, [participant])

  return networkQualityLevel
}
