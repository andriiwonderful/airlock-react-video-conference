import React from 'react'
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import SelectRoom from './pages/selectroom/selectroom'
import LoginRoom from './pages/loginroom/loginroom'
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SelectRoom} />
        <Route path="/login" component={LoginRoom} />
      </Switch>
    </Router>
  )
}
export default App
