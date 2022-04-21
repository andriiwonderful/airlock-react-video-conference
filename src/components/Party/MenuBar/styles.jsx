import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  joinButton: {
    marginLeft: 'auto',
    backgroundColor: theme.palette.success.dark,
    '&:hover': {
      backgroundColor: theme.palette.success.light,
    },
  },

  exitButton: {
    marginLeft: 'auto',
  },

  roomTitle: {
    fontFamily: 'arial',
    fontWeight: '600',
  },
}))

export default useStyles
