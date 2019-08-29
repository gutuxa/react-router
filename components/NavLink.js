import React from 'react'
import cn from 'classnames'
import Link from './Link'
import { HistoryContext } from '../components/Router'
import { matchPath } from '../services'

class NavLink extends React.PureComponent {
  isActive = pathname => {
    const { to, exact } = this.props

    return matchPath(
      pathname,
      {
        path: to,
        exact
      }
    )
  }

  render () {
    const {
      className,
      activeClassName,
      ...props
    } = this.props

    return (
      <HistoryContext.Consumer>
        {
          ({ pathname }) => (
            <Link
              {...props}
              className={cn(
                className,
                { [activeClassName]: this.isActive(pathname) }
              )}
            />
          )
        }
      </HistoryContext.Consumer>
    )
  }
}

export default NavLink
