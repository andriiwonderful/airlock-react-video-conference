import React from 'react'
import path from 'path'
import { makeStyles } from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
  tabControlWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  tabControlItem: {
    padding: theme.spacing(1),
    opacity: '0.3',
    '& > img': {
      width: '100%',
    },
  },
  tabControlItemActive: {
    padding: theme.spacing(1),
    opacity: 1,
    '& > img': {
      width: '100%',
    },
  },
}))

const PartyTabControl = ({ status, setTabStatus }) => {
  const classes = useStyles()
  return (
    <div className={classes.tabControlWrapper}>
      <div
        className={`${
          status === 'dj'
            ? classes.tabControlItemActive
            : classes.tabControlItem
        }`}
        onClick={() => setTabStatus('dj')}
      >
        <img
          src={path.resolve(__dirname, 'assets', 'live-dj-white.png')}
          alt="DJ"
        />
      </div>
      <div
        className={`${
          status === 'fav'
            ? classes.tabControlItemActive
            : classes.tabControlItem
        }`}
        onClick={() => setTabStatus('fav')}
      >
        <img src={path.resolve(__dirname, 'assets', 'fav.png')} alt="fav" />
      </div>
      <div
        className={`${
          status === 'grid'
            ? classes.tabControlItemActive
            : classes.tabControlItem
        }`}
        onClick={() => setTabStatus('grid')}
      >
        <img src={path.resolve(__dirname, 'assets', 'grid.png')} alt="Grid" />
      </div>
    </div>
  )
}

export default PartyTabControl
