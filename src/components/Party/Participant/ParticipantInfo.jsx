import React from 'react'
import clsx from 'clsx'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import AudioLevelIndicator from './AudioLevelIndicator'
import BandwidthWarning from './BandwidthWarning'
import NetworkQualityLevel from './NetworkQualityLevel'
import ParticipantConnectionIndicator from './ParticipantConnectionIndicator'
import PinIcon from './PinIcon'
import ScreenShare from '@material-ui/icons/ScreenShare'
import VideocamOff from '@material-ui/icons/VideocamOff'

import useParticipantNetworkQualityLevel from '../../../hooks/useParticipantNetworkQualityLevel'
import useIsTrackSwitchedOff from '../../../hooks/useIsTrackSwitchedOff'
import useTrack from '../../../hooks/useTrack'
import usePublications from '../../../hooks/usePublications'

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      // height: `${(theme.sidebarWidth * 9) / 16}px`,
      height: '100%',
      overflow: 'hidden',
      cursor: 'pointer',
      '& video': {
        filter: 'none',
      },
      '& svg': {
        stroke: 'black',
        strokeWidth: '0.8px',
      },
      [theme.breakpoints.down('xs')]: {
        height: theme.sidebarMobileHeight,
        width: `${(theme.sidebarMobileHeight * 16) / 9}px`,
        marginRight: '3px',
        fontSize: '10px',
      },
    },
    isVideoSwitchedOff: {
      '& video': {
        filter: 'blur(4px) grayscale(1) brightness(1)',
      },
    },
    infoContainer: {
      position: 'absolute',
      zIndex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
      padding: '0.4em',
      width: '100%',
      background: 'transparent',
    },
    hideVideo: {
      // background: 'black',
    },
    identity: {
      background: 'rgba(0, 0, 0, 0.7)',
      padding: '0.1em 0.3em',
      margin: 0,
      display: 'flex',
      alignItems: 'center',
    },
    infoRow: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  }),
)

export default function ParticipantInfo({
  participant,
  onClick,
  isSelected,
  children,
}) {
  const publications = usePublications(participant)

  const audioPublication = publications.find((p) => p.kind === 'audio')
  const videoPublication = publications.find((p) => p.trackName === 'camera')

  const networkQualityLevel = useParticipantNetworkQualityLevel(participant)
  const isVideoEnabled = Boolean(videoPublication)
  const isScreenShareEnabled = publications.find(
    (p) => p.trackName === 'screen',
  )

  const videoTrack = useTrack(videoPublication)
  const isVideoSwitchedOff = useIsTrackSwitchedOff(videoTrack)

  const audioTrack = useTrack(audioPublication)

  const classes = useStyles()

  return (
    <div
      className={clsx(classes.container, {
        [classes.isVideoSwitchedOff]: isVideoSwitchedOff,
      })}
      onClick={onClick}
      data-cy-participant={participant.identity}
    >
      <div
        className={clsx(classes.infoContainer, {
          [classes.hideVideo]: !isVideoEnabled,
        })}
      >
        <div className={classes.infoRow}>
          <h4 className={classes.identity}>
            <ParticipantConnectionIndicator participant={participant} />
            {participant.identity}
          </h4>
          <NetworkQualityLevel qualityLevel={networkQualityLevel} />
        </div>
        <div>
          <AudioLevelIndicator audioTrack={audioTrack} background="white" />
          {!isVideoEnabled && <VideocamOff />}
          {isScreenShareEnabled && <ScreenShare />}
          {isSelected && <PinIcon />}
        </div>
      </div>
      {isVideoSwitchedOff && <BandwidthWarning />}
      {children}
    </div>
  )
}
