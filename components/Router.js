/* global Event */
import React, { useMemo, useState, useEffect } from 'react'
import query from 'querystring'
import { setHistory, getMatch } from '../services'

export const HistoryContext = React.createContext({})

function Router (props) {
  const {
    history: {
      location: { pathname: p, search: s },
      push
    },
    routes
  } = props

  const normalizeSearch = str => (
    query.parse(str.replace(/^\?/g, ''))
  )

  const [updater, forceUpdate] = useState(p)
  const [pathname, setPathname] = useState(p)
  const [search, setSearch] = useState(normalizeSearch(s))
  const [match, setMatch] = useState(getMatch(p, routes))

  const updateLocation = ({ pathname, search }) => {
    const newSearch = normalizeSearch(search)
    const newMatch = getMatch(pathname, routes)

    if (Router.pathname === pathname) {
      setSearch(newSearch)
      forceUpdate({ pathname, search: newSearch, match })

      Router.search = search
      return
    }

    setPathname(pathname)
    setSearch(newSearch)
    setMatch(newMatch)

    forceUpdate({
      pathname,
      search: newSearch,
      match: newMatch
    })

    Router.pathname = pathname
    Router.search = search
  }

  const handleUpdateLocation = location => {
    updateLocation(location)

    if (typeof Event === 'function' && window.dispatchEvent) {
      try {
        window.dispatchEvent(new Event('locationchange'))
      } catch (err) {}
    }
  }

  useEffect(() => {
    Router.pathname = p
    Router.search = s
    setHistory(props.history)

    return props.history.listen(handleUpdateLocation)
  }, [])

  return useMemo(
    () => (
      <HistoryContext.Provider
        value={{
          pushState: push,
          context: props.context,
          pathname,
          search,
          match
        }}
      >
        {props.children}
      </HistoryContext.Provider>
    ),
    [updater, props.context]
  )
}

export default Router
