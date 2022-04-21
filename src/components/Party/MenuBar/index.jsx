import React from 'react'
import path from 'path'
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'
import useStyles from './styles'
import useRoomState from '../../../hooks/useRoomState'
const MenuBar = ({ roomTitle, onLeft, onJoinToParty }) => {
  const classes = useStyles()
  const roomState = useRoomState()
  console.log('roomState', roomState)
  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography
          variant="h5"
          color="inherit"
          noWrap
          className={classes.roomTitle}
        >
          <img
            src={path.resolve(__dirname, 'assets', 'brand-logo.png')}
            alt="brand-logo"
          />
          {roomTitle}
        </Typography>
        {roomState === 'disconnected' ? (
          <Button
            variant="contained"
            color="primary"
            className={classes.joinButton}
            onClick={onJoinToParty}
          >
            <DoubleArrowIcon />
            Join to Party
          </Button>
        ) : (
          ''
        )}
        <Button
          variant="contained"
          color="secondary"
          className={classes.exitButton}
          onClick={onLeft}
        >
          <ExitToAppIcon />
          LEFT
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default MenuBar
