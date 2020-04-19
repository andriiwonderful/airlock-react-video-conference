import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import SelectPage from './pages/SelectPage'
import LoginPage from './pages/LoginPage'
import { CookiesProvider } from 'react-cookie'
import PrivateRoute from './components/PrivateRoute'
function App() {
  return (
    <CookiesProvider>
      <Router>
        <Switch>
          <PrivateRoute exact path="/">
            <SelectPage />
          </PrivateRoute>
          <Route path="/login" component={LoginPage} />
        </Switch>
      </Router>
    </CookiesProvider>
  )
}
export default App
