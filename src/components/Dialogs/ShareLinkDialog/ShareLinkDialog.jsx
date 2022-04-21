import React from 'react'
import path from 'path'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Button } from '@material-ui/core'
import { CopyIcon } from '../../Icons/Icons'

const useStyles = makeStyles((theme) => ({
  dialog: {
    display: 'flex',
    flexDirection: 'column',
    '& .dialog-title': {
      textAlign: 'center',
      borderBottom: '1px solid rgba(0, 0, 0, .1)',

      '& h2': {
        fontFamily: 'roboto',
        fontSize: '28px',
        margin: '0px',
      },
    },
    '& .dialog-content': {
      padding: '50px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',

      '& .logo-section': {
        display: 'flex',
        justifyContent: 'center',
      },
      '& .description-section p': {
        color: '#4B4E61',
        fontFamily: 'Roboto',
      },
      '& .url-section': {
        color: '#4B4E61',
        fontFamily: 'Roboto',
        display: 'flex',
        border: '2px solid #DBDAE2',
        padding: '10px',
      },
      '& .url-section p': {
        fontSize: '12pt',
        margin: '0px',
      },
      '& .url-section p.url-link': {
        fontStyle: 'bold',
      },
    },
  },
}))

const UrlCopyButton = withStyles({
  root: {
    border: 'none',
    fontSize: '20px',
  },
})(Button)

const ShareLinkDialog = ({ open, handleClose }) => {
  const classes = useStyles()

  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="share-link-dialog-title"
        class={classes.dialog}
      >
        <DialogTitle className="dialog-title">
          <h2>
            Share With Your Fan
            <span role="img" aria-label="flower-bunch">
              🎉
            </span>
          </h2>
        </DialogTitle>
        <DialogContent className="dialog-content">
          <div className="logo-section">
            <img
              src={path.resolve(__dirname, 'assets', 'youtube.png')}
              alt="youtube"
            />
            <img
              src={path.resolve(__dirname, 'assets', 'facebook.png')}
              alt="youtube"
            />
          </div>
          <div className="description-section">
            <p> Share this link directly on your Live Facebook or Youtube</p>
          </div>

          <div className="url-section">
            <div className="url-content">
              <p> URL of the event</p>
              <p className="url-link">
                https://www.squareparty.com/live/new-live-stream-experience/2334
              </p>
            </div>
            <div className="action">
              <UrlCopyButton>
                <CopyIcon />
              </UrlCopyButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ShareLinkDialog
