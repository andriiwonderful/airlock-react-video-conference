import React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

const theme = createMuiTheme({
  type: 'dark',
  palette: {
    primary: {
      main: '#235BF6',
    },
  },
  shadows: ['none'],
  sidebarWidth: 260,
  sidebarMobileHeight: 90,
})

const AirlockTheme = ({ children }) => {
  return <ThemeProvider theme={theme}> {children} </ThemeProvider>
}

export default AirlockTheme
