import React from 'react'
import hoistStatics from 'hoist-non-react-statics'
import { HistoryContext } from './Router'

export default Component => {
  const C = props => (
    <HistoryContext.Consumer>
      { ({ pathname, search, context, match, pushState }) => (
        <Component
          {...props}
          context={context}
          pathname={pathname}
          search={search}
          push={pushState}
          match={match}
        />
      ) }
    </HistoryContext.Consumer>
  )

  return hoistStatics(C, Component)
}
