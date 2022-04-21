import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const ConfirmDialog = ({
  isOpen,
  title,
  description,
  disagreeText,
  agreeText,
  handleDisagree,
  handleAgree,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={handleDisagree}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle className="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText className="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="secondary" onClick={handleAgree}>
          {agreeText || 'Agree'}
        </Button>
        <Button variant="contained" onClick={handleDisagree}>
          {disagreeText || 'Disagree'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
