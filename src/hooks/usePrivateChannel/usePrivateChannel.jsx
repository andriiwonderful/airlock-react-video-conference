import { useSelector } from 'react-redux'
const usePrivateChannel = () => {
  const userData = useSelector((state) => state.user)
  const privateChannelName = `${userData.identity}-channel`
  return privateChannelName
}

export default usePrivateChannel
