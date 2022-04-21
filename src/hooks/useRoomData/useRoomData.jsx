import React from 'react'
import { useSelector } from 'react-redux'
const useRoomData = () => {
  const roomData = useSelector((state) => state.room)
  return roomData
}

export default useRoomData
