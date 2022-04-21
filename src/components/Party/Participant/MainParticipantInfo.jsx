import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'

import VideocamOff from '@material-ui/icons/VideocamOff'
import usePublications from '../../../hooks/usePublications'
import useTrack from '../../../hooks/useTrack'
import useIsTrackSwitchedOff from '../../../hooks/useIsTrackSwitchedOff'
import BandwidthWarning from './BandwidthWarning'

const useStyles = makeStyles({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 'calc(100% - 70px)',
    background: 'black',
    border: '2px solid cyan',
    borderStyle: 'dashed',
  },
  isVideoSwitchedOff: {
    '& video': {
      filter: 'blur(4px) grayscale(1) brightness(0.5)',
    },
  },

  identity: {
    background: 'rgba(0, 0, 0, 0.7)',
    padding: '0.1em 0.3em',
    margin: '1em',
    fontSize: '1.2em',
    display: 'inline-flex',
    '& svg': {
      marginLeft: '0.3em',
    },
  },
  infoContainer: {
    position: 'absolute',
    zIndex: 1,
    height: '100%',
    padding: '0.4em',
    width: '100%',
  },
})

export default function MainParticipantInfo({ participant, children }) {
  const classes = useStyles()

  const publications = usePublications(participant)
  const videoPublication = publications.find((p) => p.trackName === 'camera')
  const isVideoEnabled = Boolean(videoPublication)
  const videoTrack = useTrack(videoPublication)
  const isVideoSwitchedOff = useIsTrackSwitchedOff(videoTrack)

  return (
    <div
      data-cy-main-participant
      className={clsx(classes.container, {
        [classes.isVideoSwitchedOff]: isVideoSwitchedOff,
      })}
    >
      <div className={classes.infoContainer}>
        <h4 className={classes.identity}>
          {participant.identity}
          {!isVideoEnabled && <VideocamOff />}
        </h4>
      </div>
      {isVideoSwitchedOff && <BandwidthWarning />}
      {children}
    </div>
  )
}
