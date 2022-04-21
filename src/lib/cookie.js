export function setCookie(name, value) {
  document.cookie = name + '=' + value + '; Path=/;'
}

export function getCookie(cookieName) {
  var name = cookieName + '='
  var allCookieArray = document.cookie.split(';')
  for (var i = 0; i < allCookieArray.length; i++) {
    var temp = allCookieArray[i].trim()
    if (temp.indexOf(name) === 0)
      return temp.substring(name.length, temp.length)
  }
  return ''
}

export function getAccessToken() {
  const token = getCookie('airlock_token')
  return token
}

export function setAccessToken(token) {
  setCookie('airlock_token', token)
}

export function removeAccessToken() {
  setCookie('airlock_token', '')
}
