import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default class PrivateRoute extends Route {
  render() {
    if (!window.ReactRouterAuth0Provider.isLoggedIn()) {
      window.ReactRouterAuth0Provider.setNextPath(this.props.location.pathname)
      return <Redirect to={{ pathname: window.ReactRouterAuth0Provider.options.loginRoute, state: { from: this.props.location } }} />
    }

    return <Route {...this.props} component={this.props.component} />
  }
}
