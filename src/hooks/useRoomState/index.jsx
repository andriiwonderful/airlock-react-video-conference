import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function useRoomState() {
  const room = useSelector((state) => state.room.room)
  const [state, setState] = useState('disconnected')

  useEffect(() => {
    const setRoomState = () => {
      setState(room.state || 'disconnected')
      if (room.state === 'connected') console.log(room)
    }
    setRoomState()
    room
      .on('disconnected', setRoomState)
      .on('reconnected', setRoomState)
      .on('reconnecting', setRoomState)
    return () => {
      room
        .off('disconnected', setRoomState)
        .off('reconnected', setRoomState)
        .off('reconnecting', setRoomState)
    }
  }, [room])

  return state
}
