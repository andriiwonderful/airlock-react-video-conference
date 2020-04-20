import React from 'react'
import ReactDOM from 'react-dom'
import './style.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { CookiesProvider } from 'react-cookie'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Reducer from './redux'
const store = createStore(
  Reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
