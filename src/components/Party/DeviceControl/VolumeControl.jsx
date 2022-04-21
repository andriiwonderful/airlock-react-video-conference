import React from 'react'
import {
  makeStyles,
  withStyles,
  Grid,
  Slider,
  Typography,
} from '@material-ui/core'
import VolumeDown from '@material-ui/icons/VolumeDown'
import VolumeUp from '@material-ui/icons/VolumeUp'
const useStyles = makeStyles((theme) => ({
  volumeControlWrapper: {
    display: 'block',
  },
}))

const VolumeSlider = withStyles({
  root: {
    color: '#fff',
  },
  thumb: {
    backgroundColor: '#fff',
  },
})(Slider)

const VolumeControl = () => {
  const classes = useStyles()
  const [volume, setVolume] = React.useState(30)
  const handleChange = (event, newValue) => {
    setVolume(newValue)
  }
  return (
    <div className={classes.volumeControlWrapper}>
      <Grid container spacing={2}>
        <Grid item>
          <VolumeDown />
        </Grid>
        <Grid item xs>
          <VolumeSlider
            value={volume}
            onChange={handleChange}
            aria-labelledby="continuous-slider"
            style={{ thumb: { backgroundColor: '#fff' } }}
          />
        </Grid>
        <Grid item>
          <VolumeUp />
        </Grid>
      </Grid>
    </div>
  )
}

export default VolumeControl
