const actions = {
  CHECK_AUTH: 'CHECK_AUTH',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGIN_REQUEST',
  LOGIN_FAIL: 'LOGIN_FAIL',
  checkAuth: () => ({ type: actions.CHECK_AUTH }),
  login: (token, setCookie) => ({
    type: actions.LOGIN,
    token: token,
    setCookie,
  }),
  loginFail: () => ({ type: actions.LOGIN_FAIL }),
}

export default actions
