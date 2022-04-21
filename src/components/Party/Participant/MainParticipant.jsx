import React, { useState, useEffect } from 'react'
import ParticipantTracks from './ParticipantTracks'
import MainParticipantInfo from './MainParticipantInfo'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 'calc(100% - 70px)',
    background: 'black',
    border: '2px solid cyan',
    borderStyle: 'dashed',
  },
})
export default function MainParticipant() {
  const classes = useStyles()
  const roomData = useSelector((state) => state.room)
  const participants = roomData.participants
  const [mainParticipant, setMainParticipant] = useState(
    participants[Math.floor(Math.random() * participants.length)],
  )
  const selectMainRandomly = () =>
    setMainParticipant(
      participants[Math.floor(Math.random() * participants.length)],
    )
  const duration = 15000
  useEffect(() => {
    const interval = setInterval(() => {
      selectMainRandomly()
    }, duration)
    return () => clearInterval(interval)
  }, [])

  return mainParticipant ? (
    <MainParticipantInfo participant={mainParticipant}>
      <ParticipantTracks
        participant={mainParticipant}
        disableAudio
        // videoPriority={videoPriority}
      />
    </MainParticipantInfo>
  ) : (
    <div className={classes.container}>No one selected</div>
  )
}
