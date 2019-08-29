import React from 'react'
import { createBrowserHistory } from 'history'
import Router from './Router'

export default ({ routes, children }) => {
  const history = createBrowserHistory()

  return (
    <Router history={history} routes={routes}>
      { children }
    </Router>
  )
}
