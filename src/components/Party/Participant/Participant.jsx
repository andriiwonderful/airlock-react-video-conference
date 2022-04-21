import React from 'react'
import ParticipantTracks from './ParticipantTracks'
import ParticipantInfo from './ParticipantInfo'
import { useSelector } from 'react-redux'

export default function Participant({ participant, disableAudio }) {
  const room = useSelector((state) => state.room.room)
  return (
    <ParticipantInfo participant={participant} disableAudio={disableAudio}>
      <ParticipantTracks
        participant={participant}
        disableAudio={disableAudio}
      />
    </ParticipantInfo>
  )
}
