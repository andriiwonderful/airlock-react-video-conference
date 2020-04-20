import actions from './actions'
const initState = {
  token: '',
}
const twilioReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.SET_TOKEN:
      return { token: action.token }
    default:
      return state
  }
}
