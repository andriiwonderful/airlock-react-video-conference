import React, { useState, useCallback } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import useAuth from '../../hooks/useAuth'
import { useHistory, useLocation } from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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

const LonginRoom = () => {
  let history = useHistory()
  let location = useLocation()

  const { from } = location.state || { from: { pathname: '/' } }

  const classes = useStyles()
  const [passcode, setPasscode] = useState('')
  const [isAuthenticated, accessToken, setAccessToken] = useAuth()

  const onChangePasscode = useCallback((e) => {
    setPasscode(e.target.value)
  }, [])
  const [cookies, setCookie] = useCookies([
    'airlock_access_token',
    'airlock_twilio_token',
  ])
  const onSubmit = (e) => {
    e.preventDefault()
    console.log(process.env.REACT_APP_SERVER_ENDPOINT)
    const endpoint = process.env.REACT_APP_SERVER_ENDPOINT + '/login'
    const payload = { passcode }
    axios
      .post('http://localhost:8081/login', payload)
      .then((res) => {
        setAccessToken(res.data)
        // console.log(setAccessToken)
        // setCookie('airlock_access_token', res.data)
        history.replace(from)
      })
      .catch((error) => {
        console.log('err', error)
      })
  }

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="passcode"
            label="passcode"
            autoComplete=""
            onChange={onChangePasscode}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Access
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default LonginRoom
