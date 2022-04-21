import React from 'react'
import { styled } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core'
import { useSelector } from 'react-redux'
import Participant from '../Participant/Participant'

const useStyles = makeStyles((theme) => ({
  listItem: {
    width: '33%',
    height: 'fit-content',
    [theme.breakpoints.down('xs')]: {
      width: '50%',
    },
  },
}))

const ScrollContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  overflowY: 'scroll',
  height: 'calc(100% - 70px)',
}))

const ParticipantListView = () => {
  const roomData = useSelector((state) => state.room)
  const room = roomData.room
  const participants = roomData.participants
  const localParticipant = roomData.room.localParticipant
  const classes = useStyles()
  return (
    <ScrollContainer>
      {participants.map((participant) => (
        <div className={classes.listItem}>
          <Participant
            key={participant.sid}
            participant={participant}
            disableAudio={true}
          />
        </div>
      ))}
      {/* {[...Array(11)].map((id) => (
        <div className={classes.listItem}>
          <Participant participant={localParticipant} disableAudio={true} />
        </div>
      ))} */}
    </ScrollContainer>
  )
}

export default ParticipantListView
