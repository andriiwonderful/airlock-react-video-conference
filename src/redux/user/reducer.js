import { handleActions } from 'redux-actions'
import * as actions from './actions'
// import { setAccessToken, removeAccessToken } from '../../lib/cookie'

let initState = {
  identity: '',
  token: '',
  link: '',
  role: '',
}

const userReducer = handleActions(
  {
    [actions.LOGIN_FAILED]: () => {
      return initState
    },

    [actions.LOGIN_SUCCESS]: (state, action) => {
      if (action.payload === null) return initState
      return {
        ...action.payload,
      }
    },
    [actions.DJ_CONNECT_SUCCESS]: (state, action) => {
      return {
        identity: action.payload.username,
        token: action.payload.token,
        link: action.payload.link,
        role: 'dj',
      }
    },
  },
  initState,
)
export default userReducer
