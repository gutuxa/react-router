import React from 'react'
import { joinPath } from '../services'

export default class Route extends React.Component {
  render () {
    const {
      component: Component,
      path,
      routes: prevRoutes
    } = this.props

    const routes = prevRoutes
      ? prevRoutes.map(route => ({
        ...route,
        path: joinPath(path, route.path)
      }))
      : null

    return <Component
      route={{ routes }}
    />
  }
}
