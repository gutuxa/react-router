import React from 'react'
import { HistoryContext } from './Router'

export default class Link extends React.PureComponent {
  handleClick = pushState => e => {
    const {
      to,
      target,
      global,
      download
    } = this.props

    if (
      (e.button && e.button !== 0) ||
      e.metaKey ||
      e.altKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.defaultPrevented ||
      global ||
      target === '_blank' ||
      to.indexOf('http') === 0 ||
      download
    ) {
      return
    }

    e.preventDefault()

    const [pathname, search] = to.split('?')

    pushState({
      pathname,
      search,
      hash: ''
    })
  }

  render () {
    const {
      to,
      children,
      className,
      target,
      tabIndex,
      download,
      onClick
    } = this.props

    return (
      <HistoryContext.Consumer>
        {
          ({ pushState, match }) => {
            const { lang = '' } = match

            return <a
              href={to}
              target={target}
              className={className}
              tabIndex={tabIndex}
              download={download}
              onClick={onClick || this.handleClick(pushState, lang)}
            >
              {children}
            </a>
          }
        }
      </HistoryContext.Consumer>
    )
  }
}
