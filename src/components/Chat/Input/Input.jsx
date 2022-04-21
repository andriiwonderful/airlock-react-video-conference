import React from 'react'

import './Input.css'
import { PaperPlanIcon } from '../../Icons/Icons'

import { makeStyles } from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0px 5px',
  },
  sendButton: {
    backgroundColor: 'blue',
    marginTop: '2px',
    float: 'right',
    textDecoration: 'none',
    background: '#2979FF',
    padding: '10px',
    color: '#fff !important',
    border: 'none',
    width: 'fit-content',
    alignSelf: 'flex-end',
    borderRadius: '5px',
    '&:focus': {
      outline: 'none',
    },
  },
}))
const Input = ({ sendMessage, setMessage, message }) => {
  const classes = useStyles()
  return (
    <form className={classes.form}>
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(event) =>
          event.key === 'Enter' ? sendMessage(event) : null
        }
      />
      <button onClick={sendMessage} className={classes.sendButton}>
        Send <PaperPlanIcon />
      </button>
    </form>
  )
}
export default Input
