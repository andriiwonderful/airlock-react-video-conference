import { useContext } from 'react'
import { VideoPartyContext } from '../../components/Party/VideoPartyProvider'
const useVideoPartyContext = () => {
  const context = useContext(VideoPartyContext)
  if (!context) {
    throw new Error('useVideoContext must be used within a VideoProvider')
  }
  return context
}

export default useVideoPartyContext
