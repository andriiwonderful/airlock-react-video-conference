import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'

import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow'

const useStyles = makeStyles((theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1),
    },
  }),
)

export default function JoinButton(props) {
  const classes = useStyles()

  return (
    <Tooltip
      title={'Join'}
      placement="top"
      PopperProps={{ disablePortal: true }}
    >
      <Fab className={classes.fab} data-cy-audio-toggle>
        <DoubleArrowIcon />
      </Fab>
    </Tooltip>
  )
}
