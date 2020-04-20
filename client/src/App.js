import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import SelectPage from './pages/SelectPage'
import LoginPage from './pages/LoginPage'
import PrivateRoute from './components/PrivateRoute'
import { useCookies } from 'react-cookie'
function App() {
  const [cookies, setCookie, removeCookie] = useCookies('airlock_access_token')

  const accessToken = cookies.airlock_access_token

  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/">
          <SelectPage />
        </PrivateRoute>
        <Route path="/login" component={LoginPage} />
      </Switch>
    </Router>
  )
}
export default App
