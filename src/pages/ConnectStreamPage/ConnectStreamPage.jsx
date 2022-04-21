import React, { useState } from 'react'
import path from 'path'
import {
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Input,
  Button,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { djConnect } from '../../redux/user/actions'
const useStyles = makeStyles((theme) => ({
  header: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  mainContainer: {
    height: '100%',
  },

  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // height: '100%',
  },

  formContainer: {
    textAlign: 'center',
    marginTop: '100px',
    '& h2': {
      color: theme.palette.primary.main,
      fontFamily: 'roboto',
      fontSize: '50px',
      margin: '10px 0px',
    },
    '& p': {
      display: 'flex',
      alignItems: 'center',
      fontSize: '20px',
      color: '#707070',
    },
    '& p img': {
      marginTop: '5px',
    },
    '& p > .icon-youtube': {
      color: 'red',
    },
    '& p > span.font-facebook': {
      color: '#3b5998',
      fontFamily: 'Helvetica',
      marginLeft: '10px',
    },
  },
  form: {
    '& .username  input': {
      borderRadius: '5px 5px 0px 0px',
      padding: '20px 10px',
    },
    '& .link input': {
      borderRadius: '0px 0px 5px 5px',
      padding: '20px 10px',
    },
    '& .btn-submit': {
      marginTop: '10px',
    },
    '& .btn-submit button': {
      padding: '20px 10px',
    },
  },
  submit: { padding: '10px 30px' },
}))
const ConnectStreamPage = () => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const gotoHome = () => {
    history.push('/home')
  }

  const [form, setForm] = useState({
    username: '',
    dj: '',
  })

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }
  const onStartConnecting = (event) => {
    event.preventDefault()
    dispatch(djConnect(form.username, form.link)).then((res) => {
      history.push(`/room/${form.username}`)
      // window.history.replaceState(
      //   null,
      //   '',
      //   window.encodeURI(`/room/${form.username}}`),
      // )
    })
  }
  return (
    <>
      <div className={classes.header}>
        <AppBar position="static" color="transparent">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={gotoHome}
            >
              <img
                src={path.resolve(__dirname, 'assets', 'logo-blue.png')}
                alt="logo-blue"
              />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Square
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <main>
        <Container className={classes.container}>
          <div className={classes.formContainer}>
            <div className={classes.description}>
              <img
                src={path.resolve(__dirname, 'assets', 'link-solid.png')}
                alt="link-solid"
              />
              <h2>Embed Your Live</h2>
              <p>
                Embed your live from
                <span className="icon-youtube">
                  <a
                    href="https://youtube.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="assets/youtube.png" alt="youtube" />
                  </a>
                </span>
                &
                <span className="font-facebook">
                  <a
                    href="https://facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="assets/facebook.png" alt="facebook" />
                  </a>
                </span>
                easily
              </p>
            </div>
            <form className={classes.form} onSubmit={onStartConnecting}>
              <div className="form-control username">
                <Input
                  placeholder="Instagram username"
                  variant="filled"
                  disableUnderline
                  fullWidth
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control link">
                <Input
                  placeholder="URL of youtube or facebook live stream"
                  variant="filled"
                  disableUnderline
                  required
                  fullWidth
                  name="link"
                  value={form.link}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control btn-submit">
                <Button
                  color="primary"
                  variant="contained"
                  disableElevation
                  className={classes.submit}
                  required
                  fullWidth
                  type="submit"
                  disabled={!form.username || !form.link}
                >
                  START CONNECTING YOUR STREAM
                </Button>
              </div>
            </form>
          </div>
        </Container>
      </main>
    </>
  )
}

export default ConnectStreamPage
