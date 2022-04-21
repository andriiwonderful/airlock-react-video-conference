import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

export default function ConfigureDialog({
  showDialog,
  closeDialog,
  setStreamUrl,
}) {
  const [url, setUrl] = React.useState('')

  const onChangeUrl = (e) => {
    setUrl(e.target.value)
  }
  const onSetStreamUrl = (e) => {
    console.log(url)
    setStreamUrl(url)
    closeDialog()
  }

  return (
    <Dialog
      open={showDialog}
      onClose={closeDialog}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Youtube Channel</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter Youtube Channel URL.</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="URL"
          type="text"
          onChange={onChangeUrl}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="default" variant="contained">
          Cancel
        </Button>
        <Button onClick={onSetStreamUrl} color="secondary" variant="contained">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}
