import { useReducer } from 'react'
import { useCookies } from 'react-cookie'

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ACCESS_TOKEN':
      action.setCookie('airlock_access_token', action.token)
      return state
    default:
      return state
  }
}

const useAuth = () => {
  const [cookies, setCookie] = useCookies([
    'airlock_access_token',
    'airlock_twilio_token',
  ])
  const [state, dispatch] = useReducer(authReducer, cookies)
  const accessToken = state.airlock_access_token
  const isAuthenticated = accessToken ? true : false

  const setAccessToken = (token) => {
    dispatch({
      type: 'SET_ACCESS_TOKEN',
      token: token,
      setCookie: setCookie,
    })
  }

  // const removeAccessToken = () => {
  //   removeCookie('airlock_access_token')
  // }

  // const accessToken = cookies.airlock_access_token
  // const isAuthenticated = accessToken ? true : false
  // const twilioToken = cookies.airlock_twilio_token
  // console.log(accessToken)
  return [isAuthenticated, accessToken, setAccessToken]
}

export default useAuth
