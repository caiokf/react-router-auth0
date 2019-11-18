import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Auth from './auth'

export default class PrivateRoute extends Route {
  render() {
    if (!Auth.isLoggedIn()) {
      Auth.setNextPath(this.props.location.pathname)
      return <Redirect to={{ pathname: '/login', state: { from: this.props.location } }}/>
    }

    return <Route {...this.props} component={this.props.component} />
  }
}
