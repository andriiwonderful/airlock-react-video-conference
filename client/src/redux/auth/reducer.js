import actions from './actions'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

function accessCookie(cookieName) {
  var name = cookieName + '='
  var allCookieArray = document.cookie.split(';')
  for (var i = 0; i < allCookieArray.length; i++) {
    var temp = allCookieArray[i].trim()
    if (temp.indexOf(name) == 0) return temp.substring(name.length, temp.length)
  }
  return ''
}

const initToken = accessCookie('airlock_access_token')
let initState = {}
if (initToken) {
  let decoded = jwt.verify(initToken, process.env.REACT_APP_AUTH_SECRET)
  initState = {
    token: initToken,
    name: decoded.username || '',
    room: decoded.roomname || '',
  }
} else {
  initState = {
    token: initToken,
    name: '',
    room: '',
  }
}

console.log(initState)
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.LOGIN:
      const decoded = jwt.verify(
        action.token,
        process.env.REACT_APP_AUTH_SECRET,
      )

      action.setCookie(action.token)
      return {
        token: action.token,
        name: decoded.username,
        room: decoded.roomname,
      }
    case actions.LOGOUT:
      //   removeCookie('airlock_access_token')
      return { token: null, name: null, room: null }
    case actions.LOGIN_FAIL:
      //   removeCookie('airlock_access_token')
      return { token: null, name: null, room: null }
    default:
      return state
  }
}

export default authReducer
