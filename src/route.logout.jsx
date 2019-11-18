import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default class LogoutRoute extends Route {
  render() {
    window.ReactRouterAuth0Provider.logout()
    return <Redirect to={{ pathname: this.props.redirect }} />
  }
}
