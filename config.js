import React from 'react'
import { HistoryContext } from './components/Router'
import Route from './components/Route'
import { matchPath } from './services'

export const renderRoutes = routes => (
  <HistoryContext.Consumer>
    {
      ({ pathname }) => {
        for (const [key, route] of routes.entries()) {
          const match = matchPath({ pathname }, route)

          if (match) {
            return <Route
              key={key}
              {...route}
            />
          }
        }
      }
    }
  </HistoryContext.Consumer>
)
