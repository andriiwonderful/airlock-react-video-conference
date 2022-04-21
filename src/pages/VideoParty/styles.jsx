import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  mainWrapper: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    height: '100%',
    position: 'relative',
  },
}))

export default useStyles
