import { combineReducers } from 'redux'
import userReducer from './user/reducer'
import roomReducer from './room/reducer'
export default combineReducers({
  user: userReducer,
  room: roomReducer,
})
