import React from 'react'
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom'
import PublicRoute from './components/RouteComponents/PublicRoute.jsx'
import RoomContainer from './containers/RoomContainer/RoomContainer'
import { SnackbarProvider } from 'notistack'
import HomePage from './pages/HomePage/HomePage'
import ConnectStreamPage from './pages/ConnectStreamPage/ConnectStreamPage'
import PrivateRoute from './components/RouteComponents/PrivateRoute'

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Router>
        <Switch>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/connect_stream">
            <ConnectStreamPage />
          </Route>
          <PublicRoute path="/party">
            <RoomContainer />
          </PublicRoute>
          <PrivateRoute path="/room/:RoomName">
            <RoomContainer />
          </PrivateRoute>
          <Route path="*">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </Router>
    </SnackbarProvider>
  )
}
export default App
