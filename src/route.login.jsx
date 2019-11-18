import _ from 'lodash'
import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default class LoginRoute extends Route {
  componentWillMount() {
    if (window.ReactRouterAuth0Provider.isLoggedIn()) {
      return
    }

    this.login = window.ReactRouterAuth0Provider.login()
  }

  componentWillUnmount() {
    this.login && this.login.hide()
    this.login = null
  }

  render() {
    if (window.ReactRouterAuth0Provider.isLoggedIn()) {
      return <Redirect to={{ pathname: window.ReactRouterAuth0Provider.options.rootRoute }} />
    }

    return null
  }
}
