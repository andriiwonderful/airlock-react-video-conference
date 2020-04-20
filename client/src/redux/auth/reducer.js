import actions from './actions'

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
console.log('initToken', initToken)
const initState = {
  token: 'airlock_access_token',
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.LOGIN:
      console.log('LOGIN ACTION ', action)
      return { token: action.token }
    case actions.LOGOUT:
      //   removeCookie('airlock_access_token')
      return { token: null }
    case actions.LOGIN_FAIL:
      //   removeCookie('airlock_access_token')
      return { token: null }
    default:
      return state
  }
}

export default authReducer
