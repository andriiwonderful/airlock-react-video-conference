import { useEffect } from 'react'
import useVideoPartyContext from '../useVideoPartyContext'
import { useSelector } from 'react-redux'
const useConnect = () => {
  const { connect } = useVideoPartyContext()
  const userData = useSelector((state) => state.user)
  useEffect(() => {
    connect(userData.token).then(() => {})
  }, [])
}

export default useConnect
