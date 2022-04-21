/**
 * random button, configuration button
 */
import React from 'react'
import { makeStyles, Button } from '@material-ui/core'
import clsx from 'clsx'
const useStyles = makeStyles((theme) => ({
  randomButton: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2),
    color: 'cyan',
    border: '2px solid cyan',
    borderRadius: '0px',
    float: 'right',
  },

  configureButton: {
    color: '#19ff03',
    border: '2px solid #19ff03',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: '5px',
    alignItems: 'flex-end',
  },
}))

const ButtonControl = ({ role, onConfigureLiveStream, onRandomButton }) => {
  const classes = useStyles()
  return (
    <div className={classes.buttonGroup}>
      <Button
        variant="outlined"
        className={classes.randomButton}
        onClick={onRandomButton}
      >
        Random Rooms
      </Button>
      {role === 'dj' ? (
        <Button
          variant="outlined"
          className={clsx(classes.randomButton, classes.configureButton)}
          style={{ marginLeft: '5px' }}
          onClick={onConfigureLiveStream}
        >
          Configure Live Stream
        </Button>
      ) : null}
    </div>
  )
}

export default ButtonControl
