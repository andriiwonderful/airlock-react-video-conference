import React from 'react'
// import Participant from '../Participant/Participant'
import { styled } from '@material-ui/core/styles'
import { useLocalVideoTrack } from '../../../hooks/useLocalTracks'
import useVideoPartyContext from '../../../hooks/useVideoPartyContext'
import Participant from '../Participant'
import useParticipants from '../../../hooks/useParticipants/useParticipants'
import { makeStyles } from '@material-ui/core'
// import useSelectedParticipant from '../VideoProvider/useSelectedParticipant/useSelectedParticipant'

const useStyles = makeStyles((theme) => ({
  item1: {
    gridArea: 'item1',
  },
  item2: {
    gridArea: 'item2',
  },
  item3: {
    gridArea: 'item3',
  },
  item4: {
    gridArea: 'item4',
  },
}))
const Container = styled('aside')(({ theme }) => ({
  padding: '0.5em',
  overflowY: 'auto',
  [theme.breakpoints.down('xs')]: {
    overflowY: 'initial',
    overflowX: 'auto',
    padding: 0,
    display: 'flex',
  },
}))

const ScrollContainer = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('xs')]: {
    display: 'flex',
  },
}))

export default function ParticipantStrip() {
  const {
    room: { localParticipant },
  } = useVideoPartyContext()
  const participants = useParticipants()
  //   const [selectedParticipant, setSelectedParticipant] = useSelectedParticipant()

  const classes = useStyles()
  return (
    <Container>
      <ScrollContainer>
        <Participant participant={localParticipant} />

        {participants.map((participant) => (
          <Participant
            key={participant.sid}
            participant={participant}
            // isSelected={selectedParticipant === participant}
            // onClick={() => setSelectedParticipant(participant)}
          />
        ))}
      </ScrollContainer>
    </Container>
  )
}
