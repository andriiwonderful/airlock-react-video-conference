import React from 'react'
import { useHistory } from 'react-router-dom'
import Participant from './Participant'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { makeStyles, Button, withStyles } from '@material-ui/core'
import { logout } from '../../../redux/user/actions'
import { useDispatch, useSelector } from 'react-redux'
const useStyles = makeStyles((theme) => ({
  mainWrapper: {
    height: '100%',
    backgroundColor: '#333333',
    border: '1px solid green',
    height: '100%',
  },
  participantWrapper: {
    height: 'calc(100% - 36px)',
  },
  buttonsWrapper: {
    marginBottom: '0px',
    height: '50px',
  },
}))

const ExitButton = withStyles({
  root: {
    borderRadius: '0px',
    border: '1px solid grey',
    backgroundColor: 'black',
    width: '100%',
    color: 'white',
    fontStyle: 'bold',
  },
})(Button)

const LocalParticipant = () => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const room = useSelector((state) => state.room.room)
  const localParticipant = room.localParticipant

  const onClickExit = (e) => {
    room.disconnect()
    dispatch(logout())
    history.push('/login')
  }

  return (
    <div className={classes.mainWrapper}>
      <div className={classes.participantWrapper}>
        <Participant participant={localParticipant} disableAudio={false} />
      </div>
      <div className={classes.buttonsWrapper}>
        <ExitButton variant="outlined" onClick={onClickExit}>
          Exit Party <ExitToAppIcon />
        </ExitButton>
      </div>
    </div>
  )
}

export default LocalParticipant
