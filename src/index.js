import React from 'react'
import ReactDOM from 'react-dom'
import './style.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import Reducer from './redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import AirlockTheme from './config/theme'
import Pusher from 'pusher-js'
import { setPusherClient } from 'react-pusher'
const store = createStore(Reducer, composeWithDevTools(applyMiddleware(thunk)))
// Puhser
const pusherClient = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
  cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
})
setPusherClient(pusherClient)
ReactDOM.render(
  <Provider store={store}>
    <AirlockTheme>
      <App />
    </AirlockTheme>
  </Provider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
