import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useCookies } from 'react-cookie'
const PrivateRoute = ({ children, ...rest }) => {
  const accessToken = useSelector((state) => state.auth.token)
  const isAuthenticated = accessToken ? true : false
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
