import React, { useState, useCallback } from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import MenuItem from '@material-ui/core/MenuItem'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const CreateRoom = () => {
  const classes = useStyles()
  const [roomMode, setRoomMode] = useState('public')
  const [roomName, setRoomName] = useState('')
  const onChangeRoomMode = useCallback((e) => {
    setRoomMode(e.target.value)
  }, [])

  const onChangeRoomName = useCallback((e) => {
    setRoomName(e.target.value)
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h3">
          CREATE
        </Typography>
        <Typography variant="body2" gutterBottom>
          Do you already have a team in mind ? Choose a name and decide to go
          public or private.
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="passcode"
            label="Choose a name"
            value={roomName}
            onChange={onChangeRoomName}
          />

          <TextField
            select
            label=""
            variant="outlined"
            fullWidth
            value={roomMode}
            onChange={onChangeRoomMode}
          >
            <MenuItem key="public" value="public">
              Public
            </MenuItem>
            <MenuItem key="private" value="private">
              Private
            </MenuItem>
          </TextField>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            CREATE
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default CreateRoom
