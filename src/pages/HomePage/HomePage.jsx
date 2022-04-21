import React from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Container,
  Paper,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { YoutubeIcon, FacebookIcon } from '../../components/Icons/Icons'
import { useHistory } from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
  header: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  connectButton: {
    borderRadius: '45px',
  },
  heroSection: {
    display: 'flex',
    // position: 'relative',
  },
  heroTitle: {
    alignSelf: 'center',
    marginRight: '-130px',
    padding: '50px',
    borderRadius: '20px 0px 0px 20px',
    boxShadow: '0px 0px 5px rgba(0, 0, 0, .1)',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  heroTitleBlack: {
    color: 'black',
    fontFamily: 'roboto',
    fontSize: '40px',
  },
  heroTitleBlue: {
    color: '#2A5FF6',
    fontFamily: 'roboto',
    fontSize: '55px',
  },
  heroImage: {},
  featureSection: {
    display: 'flex',
    '& > *': {
      flex: 1,
    },
    borderTop: '1px solid rgba(0, 0, 0, .2)',
    borderBottom: '1px solid rgba(0, 0, 0, .2)',
  },
  feature: {
    textAlign: 'center',
    padding: '30px 50px',
    '& > .logo': {
      minHeight: '80px',
    },
    '& > h2': {
      margin: '3px 0px',
      color: theme.palette.primary.main,
    },
    '& > p': {
      margin: '5px 0px',
      color: '#707070',
    },
  },
  buttonSection: {
    padding: '70px 0px',
    textAlign: 'center',
    '& > button': {
      padding: '10px 30px',
    },
  },
}))
const HomePage = () => {
  const classes = useStyles()
  const history = useHistory()
  const onConnectLiveStream = () => {
    history.push('/connect_stream')
  }
  return (
    <>
      <div className={classes.header}>
        <AppBar position="static" color="transparent">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <img src="assets/logo-blue.png" alt="logo-blue" />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Square
            </Typography>
            <Button
              color="primary"
              className={classes.connectButton}
              variant="outlined"
              onClick={onConnectLiveStream}
            >
              Connect Your Live
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      <main>
        <Container class={classes.container}>
          <div className={classes.heroSection}>
            <div className={classes.heroTitle}>
              <h2 className={classes.heroTitleBlack}>Connect around</h2>
              <h1 className={classes.heroTitleBlue}>Live Stream</h1>
              <p>
                A new way to experience livestream for both artists and
                participants.
              </p>
            </div>
            <div className={classes.heroImage}>
              <img src="assets/Webapp.png" alt="WebApp" />
            </div>
          </div>
          <div className={classes.featureSection}>
            <div className={classes.feature}>
              <div className="logo">
                <img src="assets/link-solid.png" alt="link-solid" />
              </div>
              <h2>Embed Your Live</h2>
              <p>
                Embed your live from <YoutubeIcon />
                Youtube or <FacebookIcon /> FaceBook easily.
              </p>
            </div>
            <div className={classes.feature}>
              <div className="logo">
                <img src="assets/share-solid.png" alt="link-solid" />
              </div>
              <h2>Share Your Link </h2>
              <p>Share Your SquareParty Link to people.</p>
            </div>
            <div className={classes.feature}>
              <div className="logo">
                <img
                  src="assets/dancing-solid.png"
                  alt="link-solid"
                  width="auto"
                  height="80px"
                />
              </div>
              <h2>Connect With Your Fan</h2>
              <p>
                See participant dance around your Stream and connect with them.
              </p>
            </div>
          </div>
          <div className={classes.buttonSection}>
            <Button
              color="primary"
              variant="contained"
              disableElevation
              onClick={onConnectLiveStream}
            >
              Connect Your LiveStream
            </Button>
          </div>
        </Container>
      </main>
    </>
  )
}

export default HomePage
