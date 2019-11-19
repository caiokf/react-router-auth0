import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default class LandingRoute extends Route {
  render() {
    if (window.ReactRouterAuth0Provider.isLoggedIn()) {
      return <Redirect to={{
        pathname: this.props.loggedInPath,
        state: { from: this.props.location },
      }} />
    }

    window.location.replace(this.props.landingUrl)
    return null
  }
}
