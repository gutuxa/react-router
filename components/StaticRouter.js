import React from 'react'
import { createMemoryHistory } from 'history'
import Router from './Router'

export default ({ location, context, children, routes }) => {
  const history = createMemoryHistory({
    initialEntries: [location],
    initialIndex: 0
  })

  return (
    <Router history={history} context={context} routes={routes}>
      { children }
    </Router>
  )
}
