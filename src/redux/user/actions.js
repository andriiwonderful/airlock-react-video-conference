import { createAction } from 'redux-actions'
import * as api from '../../lib/api'
import { setStreamUrlSuccess, initRoom } from '../room/actions'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const CHECK_AUTH = 'CHECK_AUTH'
export const DJ_CONNECT_SUCCESS = 'DJ_CONNECT_SUCCESS'
export const loginFailed = createAction(LOGIN_FAILED)
export const loginSuccess = createAction(LOGIN_SUCCESS)
export const djConnectSuccess = createAction(DJ_CONNECT_SUCCESS)

export const loginRequest = (passcode) => async (dispatch) => {
  try {
    const res = await api.userLogin(passcode)
    dispatch(loginSuccess(res.data))
    dispatch(setStreamUrlSuccess(res.data.stream_url))
  } catch (e) {
    dispatch(loginFailed())
    dispatch(initRoom())
    throw e
  }
}

export const logout = () => (dispatch) => {
  dispatch(loginFailed())
  dispatch(initRoom())
}

export const djConnect = (username, link) => async (dispatch) => {
  console.log('DJ CONNECT THUNK ACTION')
  try {
    const res = await api.djConnect(username, link)
    dispatch(djConnectSuccess({ username, link, token: res.data.token }))
  } catch (e) {
    dispatch(loginFailed())
    throw e
  }
}
