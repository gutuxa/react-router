import * as R from 'ramda'
import pathToRegex from 'path-to-regexp'

let historyObj = {}

export function setHistory (h) {
  h.context = {}
  historyObj = h
}

export function history () {
  return historyObj
}

export function joinPath (...args) {
  return Array.from(args).join('').replace(/(\/)+/g, '/')
}

export function matchPath (location, params) {
  const { path = '/', exact } = params
  const pattern = path.replace(/\/$/g, '')
  const pathname = joinPath(location.pathname) // normalize pathname

  let keys = []
  let re = pathToRegex(pattern, keys, { end: !!exact })
  let match = re.exec(pathname)

  if (match) {
    return keys.reduce((params, key, i) => ({
      ...params,
      [key.name]: match[i + 1]
    }), {})
  }
}

export function matchRoutes (uri, routes = [], parentPath = '/') {
  return routes.map(route => {
    const pathMerged = joinPath(parentPath, route.path || '')
    const isMatch = matchPath(
      { pathname: uri },
      { ...route, path: pathMerged }
    )

    if (isMatch) {
      return [
        { ...route, match: isMatch },
        ...(route.routes
          ? matchRoutes(uri, route.routes, pathMerged)
          : []
        )
      ]
    }
  })
}

export const getMatch = (uri, routes) => {
  const matches = matchRoutes(uri, routes)

  return R.pipe(
    R.flatten,
    R.filter(R.prop('match')),
    R.pluck('match'),
    R.mergeAll
  )(matches)
}

export const getLoaders = (uri, routes) => {
  const matches = matchRoutes(uri, routes)

  return R.flatten(matches)
    .filter(R.path(['component', 'dataLoader']))
}

export const dataLoader = (uri, routes, st = {}, dispatch) => {
  let state = { ...st }
  const loaders = getLoaders(uri, routes)
  const match = R.mergeAll(R.map(R.prop('match'), loaders))

  return Promise.all(
    loaders.map(
      loader => loader.component.dataLoader(
        state,
        dispatch,
        match
      )
    )
  )
    .then(() => state)
    .catch(e => {
      console.error('Error prefetch data ', e)
      return st
    })
}
