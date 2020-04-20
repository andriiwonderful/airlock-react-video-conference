import React from 'react'
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom'
import SelectPage from './pages/SelectPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import SelectRoute from './components/RouteComponents/SelectRoute'
import DashboardRoute from './components/RouteComponents/DashboardRoute'
import { useCookies } from 'react-cookie'
function App() {
  const [cookies, setCookie, removeCookie] = useCookies('airlock_access_token')
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/select"></Redirect>
        </Route>
        <SelectRoute exact path="/select">
          <SelectPage />
        </SelectRoute>
        <DashboardRoute path="/dashboard">
          <DashboardPage />
        </DashboardRoute>
        <Route path="/login" component={LoginPage} />
      </Switch>
    </Router>
  )
}
export default App
