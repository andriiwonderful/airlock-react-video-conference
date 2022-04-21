import { useSelector } from 'react-redux'
const useUserData = () => {
  const userData = useSelector((state) => state.user)
  return userData
}

export default useUserData
