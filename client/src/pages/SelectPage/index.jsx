import React from 'react'
import CreateRoom from '../../components/CreateRoom'
import JoinRoom from '../../components/JoinRoom'
import RandomRoom from '../../components/RandomRoom'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import 'bootstrap/dist/css/bootstrap.css'
import { Typography } from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
  watch: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  brand: {
    marginTop: theme.spacing(3),
    textAlign: 'center',
  },
  roomcontainer: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  brandtext: {
    fontSize: '1.5rem',
  },
}))

const SelectPage = () => {
  const classes = useStyles()
  return (
    <Container maxwidth="sm">
      <div className={classes.brand}>
        <div className={classes.brand}>
          <span className="brand-img">
            <img src="./assets/brand-logo.png" alt="asdf" />
          </span>
          <span className={classes.brandtext}> Airlock</span>
        </div>
        <div className={classes.description}>
          <Typography variant="body2" gutterBottom>
            You are now in the air-lock. Choose a way to enter a room and access
            to the virtual party.
          </Typography>
        </div>
      </div>
      <Grid container spacing={2} className={classes.roomcontainer}>
        <Grid item xs>
          <Paper className={classes.paper}>
            <CreateRoom />
          </Paper>
        </Grid>

        <Grid item xs>
          <Paper className={classes.paper}>
            <JoinRoom />
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
            <RandomRoom />
          </Paper>
        </Grid>
      </Grid>
      <Divider />
      <div className="row float-right mt-2">
        <Button variant="contained" color="secondary">
          I just want to watch the live
        </Button>
      </div>
    </Container>
  )
}

export default SelectPage
