import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Auth from './auth'

export default class LogoutRoute extends Route {
  render() {
    Auth.logout()
    return <Redirect to={{ pathname: this.props.redirect }}/>
  }
}
