import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/app.js'
import store from './store.js'

render(
  <Provider store={store}>
    <App containerId={document.getElementById('root').getAttribute('containerId')} />
  </Provider>,
  document.getElementById('root')
)
