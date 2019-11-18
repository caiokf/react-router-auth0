import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default class LogoutRoute extends Route {
  render() {
    window.ReactRouterAuth0Provider.logout()

    const redirect = this.props.redirect ||
      window.ReactRouterAuth0Provider.options.rootRoute

    return <Redirect to={{ pathname: redirect }} />
  }
}
