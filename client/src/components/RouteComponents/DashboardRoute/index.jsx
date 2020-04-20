import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const DashboardRoute = ({ children, ...rest }) => {
  const { token: accessToken, room } = useSelector((state) => state.auth)
  const isAuthenticated = accessToken ? true : false
  const hasRoom = room ? true : false
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          hasRoom ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/select',
                state: { from: location },
              }}
            />
          )
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

export default DashboardRoute
