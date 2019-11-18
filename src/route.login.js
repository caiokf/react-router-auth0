import _ from 'lodash'
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Auth from './auth'

export default class LoginRoute extends Route {
  componentWillMount() {
    if (Auth.isLoggedIn()) {
      return
    }

    if (_.includes(this.props.location.search, 'signup')) {
      this.login = Auth.login({ initialScreen: 'signUp' })
    } else {
      this.login = Auth.login()
    }
  }

  componentWillUnmount() {
    this.login && this.login.hide()
    this.login = null
  }

  render() {
    if (Auth.isLoggedIn()) {
      return <Redirect to={{ pathname: '/' }}/>
    }

    return null
  }
}
