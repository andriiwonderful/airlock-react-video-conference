import React from 'react'
import useAuth from '../../hooks/useAuth'
import { Route, Redirect } from 'react-router-dom'
const PrivateRoute = ({ children, ...rest }) => {
  const [isAuthenticated] = useAuth()
  console.log('isAuthenticated =>', isAuthenticated)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
