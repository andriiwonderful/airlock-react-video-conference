import React from 'react'
import VideoTrack from '../tracks/VideoTrack'
import CircularProgress from '@material-ui/core/CircularProgress'

import { makeStyles, Container } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  localPreview: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  previewWrapper: {
    border: '1px solid green',
    marginTop: theme.spacing(5),
    width: '640px',
    height: '480px',
  },

  loadingWrapper: {
    width: 'inherit',
    height: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

const LocalPreviewWrapper = ({ children }) => {
  const classes = useStyles()
  return <div className={classes.previewWrapper}>{children}</div>
}

const LoadingViewer = () => {
  const classes = useStyles()
  return (
    <div className={classes.loadingWrapper}>
      <CircularProgress disableShrink />
    </div>
  )
}
const LocalVideoPreview = ({ localTracks }) => {
  const classes = useStyles()
  console.log(localTracks)
  const videoTrack = localTracks.find((track) => track.name === 'camera')
  return (
    <Container spacing={10} className={classes.localPreview}>
      <LocalPreviewWrapper>
        {videoTrack ? (
          <VideoTrack track={videoTrack} isLocal></VideoTrack>
        ) : (
          <LoadingViewer />
        )}
      </LocalPreviewWrapper>
    </Container>
  )
}

export default LocalVideoPreview
