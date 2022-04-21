import React from 'react'
import VolumeControl from './VolumeControl'
import DeviceSwitchControl from './DeviceSwitchControl'
import { Grid, Typography, makeStyles } from '@material-ui/core'
import useParticipants from '../../../hooks/useParticipants/useParticipants'
import { useSelector } from 'react-redux'
const useStyles = makeStyles((theme) => ({
  participantInfo: {
    color: 'cyan',
  },
}))
const DeviceControl = ({ tabStatus }) => {
  const classes = useStyles()
  const pLen = useSelector((state) => state.room).participants.length
  return (
    <>
      <Grid container spacing={2}>
        <Grid item>
          <Typography>
            participants (
            <span className={classes.participantInfo}>{pLen + 1}</span>)
          </Typography>
        </Grid>
      </Grid>
      <VolumeControl />
      <DeviceSwitchControl />
    </>
  )
}

export default DeviceControl
