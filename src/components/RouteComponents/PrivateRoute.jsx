import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ children, ...rest }) => {
  const userData = useSelector((state) => state.user)

  return (
    <Route
      {...rest}
      render={({ location }) =>
        userData.token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
