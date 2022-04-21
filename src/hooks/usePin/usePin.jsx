import { useSelector } from 'react-redux'
const usePin = (pinId) => {
  const roomData = useSelector((state) => state.room)
  const pins = roomData.pins
  if (pins.length <= pinId) return null
  else {
    return pins[pinId]
  }
}

export default usePin
