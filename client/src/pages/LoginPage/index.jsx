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
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import actions from '../../redux/auth/actions'
import AlertDialog from '../../components/Dialogs/AlertDialog'
import { useCookies } from 'react-cookie'
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
  const history = useHistory()
  const location = useLocation()
  const { from } = location.state || { from: { pathname: '/' } }
  const classes = useStyles()
  const [passcode, setPasscode] = useState('')
  const dispatch = useDispatch()
  const [dialogShow, setDialogShow] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies([
    'airlock_access_token',
  ])

  const onChangePasscode = useCallback((e) => {
    setPasscode(e.target.value)
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    const endpoint = 'http://localhost:8081'
    const payload = { passcode }
    axios
      .post(`${endpoint}/login`, payload)
      .then((res) => {
        const token = res.data
        dispatch(
          actions.login(token, (token) =>
            setCookie('airlock_access_token', token),
          ),
        )
        history.replace(from)
      })
      .catch((error) => {
        setDialogShow(true)
        removeCookie('airlock_access_token')
        dispatch(actions.loginFail())
      })
  }

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <AlertDialog
        isOpen={dialogShow}
        title="Access Failed"
        description="Passcode doesn't exit!"
        buttonText="OK"
        handleClose={() => setDialogShow(false)}
      />
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
