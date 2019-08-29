import React from 'react'
import { HistoryContext } from './Router'

export default class Redirect extends React.Component {
  componentDidMount () {
    if (this.redirect) {
      this.redirect()
    }
  }

  createRedirect = (pushState, to) => {
    const [pathname, search] = to.split('?')

    this.redirect = () => (
      pushState({
        pathname,
        search: search ? `?${search}` : '',
        hash: ''
      })
    )

    return null
  }

  render () {
    const { to } = this.props

    return (
      <HistoryContext.Consumer>
        { ({ pushState }) => this.createRedirect(pushState, to) }
      </HistoryContext.Consumer>
    )
  }
}
