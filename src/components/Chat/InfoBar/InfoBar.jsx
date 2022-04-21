import React from 'react'
import { CloseIcon } from '../../Icons/Icons'
import { makeStyles, withStyles, Button } from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
  infoBar: {
    color: '#464646',
    background: '#F4F4F4',
    borderRadius: '4px 4px 0 0',
    height: '10%',
    alignSelf: 'flex-start',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0px 2px 5px rgba(0,0,0,.2)',
  },

  leftInnerContainer: {
    color: '#464646',
    flex: '0.8',
    display: 'flex',
    alignItems: 'center',
    marginLeft: '5%',
    justifyContent: 'center',
    fontWeight: 800,
  },

  rightInnerContainer: {
    display: 'flex',
    flex: '0.2',
    justifyContent: 'flex-end',
    // marginRight: '5%',
  },
}))

const CloseButton = withStyles((theme) => ({
  root: {
    minWidth: 'auto',
  },
}))(Button)
const InfoBar = ({ room, handleClose }) => {
  const classes = useStyles()
  return (
    <div className={classes.infoBar}>
      <div className={classes.leftInnerContainer}> Chat with {room}</div>
      <div className={classes.rightInnerContainer}>
        <CloseButton onClick={handleClose}>
          <CloseIcon />
        </CloseButton>
      </div>
    </div>
  )
}

export default InfoBar
