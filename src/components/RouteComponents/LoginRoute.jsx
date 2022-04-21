import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const LoginRoute = ({ children, ...rest }) => {
  const userData = useSelector((state) => state.user)
  // const roomData = useSelector((state) => state.room)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        userData.token ? (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        ) : (
          children
        )
      }
    />
  )
}

export default LoginRoute
