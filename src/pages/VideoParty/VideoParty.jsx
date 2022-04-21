import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import useRoomState from '../../hooks/useRoomState'
import path from 'path'
import clsx from 'clsx'
import { styled } from '@material-ui/core/styles'
import { makeStyles, Typography, Button, withStyles } from '@material-ui/core'
import PinParticipant from '../../components/Party/Participant/PinParticipant'
import ConfigureDialog from '../../components/Dialogs/ConfigureDialog'
import LocalParticipant from '../../components/Party/Participant/LocalParticipant'
import MainParticipant from '../../components/Party/Participant/MainParticipant'
import LiveStream from '../../components/Party/LiveStream'
import { useDispatch } from 'react-redux'
import * as roomActions from '../../redux/room/actions'
import PartyTabControl from '../../components/Party/PartyTabControl'
import DeviceControl from '../../components/Party/DeviceControl'
import ButtonControl from '../../components/Party/ButtonControl'
import PusherProvider from '../../components/PusherProvider/PusherProvider'
import ChatContainer from '../../containers/ChatContainer/ChatContainer'
import ParticipantsListView from '../../components/Party/ParticipantsListView/ParticipantsListView'
import { ExternalLinkIcon } from '../../components/Icons/Icons'
import ShareLinkDialog from '../../components/Dialogs/ShareLinkDialog/ShareLinkDialog'
const Container = styled('div')(({ theme }) => ({
  border: '1px solid #757575',
  position: 'relative',
  display: 'grid',
  width: 'calc(100% - 10px)',
  height: 'calc(100% - 10px)',
  gridTemplateColumns: `repeat(6, minmax(0, 1fr))`,
  gridTemplateRows: `repeat(5, minmax(0, 1fr))`,
  gap: '5px 5px',
  gridTemplateAreas: `"lg mp mp mp mp ct"
                      "mg mp mp mp mp bt"
                      "mg mp mp mp mp bt"
                      "me mp mp mp mp t7"
                      "t1 t2 t3 t4 t5 t6"`,
}))

const useStyles = makeStyles((theme) => ({
  mainWrapper: {
    backgroundColor: '#3f3f3f',
    color: theme.palette.primary.contrastText,
    height: '100vh',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  mainViewer: {
    gridArea: 'mp',
    padding: theme.spacing(1),
    backgroundColor: '#343334',
  },
  logo: {
    gridArea: 'lg',
    paddingTop: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'left',
    alignItems: 'self-start',
  },
  chat: {
    gridArea: 'mg',
    paddingLeft: '5px',
  },
  me: {
    gridArea: 'me',
  },
  tabControl: {
    gridArea: 'ct',
  },
  deviceContro: {
    gridArea: 'bt',
  },
  t1: {
    gridArea: 't1',
  },
  t2: {
    gridArea: 't2',
  },
  t3: {
    gridArea: 't3',
  },
  t4: {
    gridArea: 't4',
  },
  t5: {
    gridArea: 't5',
  },
  t6: {
    gridArea: 't6',
  },
  t7: {
    gridArea: 't7',
  },
  t8: {
    gridArea: 't8',
  },
  showVideo: {
    display: 'block',
  },
  hideVideo: {
    display: 'none',
  },
}))

const ShareLinkButton = withStyles({
  root: {
    color: 'white',
    border: '2px solid white',
    borderRadius: '0px',
    backgroundColor: 'black',
    alignSelf: 'center',
    marginTop: '5px',
  },
})(Button)

const VideoParty = () => {
  const classes = useStyles()
  const roomState = useRoomState()
  const [tabStatus, setTabStatus] = useState('dj')
  const userData = useSelector((state) => state.user)
  const [showConfigDialog, setShowConfigDialog] = useState(false)
  const [showShareLinkDialog, setShowShareLinkDialog] = useState(false)
  const dispatch = useDispatch()

  const onConfigureLiveStream = () => {
    setShowConfigDialog(true)
  }

  const setStreamUrl = (url) => {
    dispatch(roomActions.setStreamUrl(url))
  }

  const onRandomButton = () => {
    dispatch(roomActions.randomizePins())
  }

  const onShareLink = () => {
    setShowShareLinkDialog(!showShareLinkDialog)
  }

  return (
    <>
      {showConfigDialog ? (
        <ConfigureDialog
          showDialog={showConfigDialog}
          closeDialog={() => setShowConfigDialog(false)}
          setStreamUrl={setStreamUrl}
        />
      ) : null}
      {showShareLinkDialog ? (
        <ShareLinkDialog
          open={showShareLinkDialog}
          handleClose={() => setShowShareLinkDialog(false)}
        />
      ) : null}
      <main className={classes.mainWrapper}>
        {roomState === 'connected' ? (
          <>
            <PusherProvider />
            <Container>
              <div className={classes.mainViewer}>
                <LiveStream tabStatus={tabStatus} />
                {tabStatus === 'dj' ? null : tabStatus === 'fav' ? (
                  <MainParticipant />
                ) : (
                  <ParticipantsListView />
                )}
                <ButtonControl
                  role={userData.role}
                  onConfigureLiveStream={onConfigureLiveStream}
                  onRandomButton={onRandomButton}
                />
              </div>
              <div className={classes.logo}>
                <img
                  src={path.resolve(__dirname, 'assets', 'logo.png')}
                  alt="logo"
                />
                <ShareLinkButton onClick={onShareLink}>
                  SHARE WITH YOUR FAN <ExternalLinkIcon />
                </ShareLinkButton>
              </div>
              <div className={classes.chat}>
                <ChatContainer />
              </div>
              <div className={classes.tabControl}>
                <PartyTabControl
                  status={tabStatus}
                  setTabStatus={setTabStatus}
                />
              </div>
              <div className={classes.deviceControl}>
                <DeviceControl tabStatus={tabStatus} />
              </div>
              <div className={classes.me}>
                <LocalParticipant />
              </div>
              <div className={classes.t1}>
                <PinParticipant pinId={0} />
              </div>
              <div className={classes.t2}>
                <PinParticipant pinId={1} />
              </div>
              <div className={classes.t3}>
                <PinParticipant pinId={2} />
              </div>
              <div className={classes.t4}>
                <PinParticipant pinId={3} />
              </div>
              <div className={classes.t5}>
                <PinParticipant pinId={4} />
              </div>
              <div className={classes.t6}>
                <PinParticipant pinId={5} />
              </div>
              <div className={classes.t7}>
                <PinParticipant pinId={6} />
              </div>
            </Container>
          </>
        ) : (
          <div> Not Connected !</div>
        )}
      </main>
    </>
  )
}

export default VideoParty
