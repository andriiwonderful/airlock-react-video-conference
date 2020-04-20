import { combineReducers } from 'redux'
import authReducer from './auth/reducer'
import twilioReducer from './twilio/reducer'
export default combineReducers({
  auth: authReducer,
  twilio: twilioReducer,
})
