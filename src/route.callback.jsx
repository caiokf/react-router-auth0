import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default class AuthCallbackRoute extends Route {
  componentWillMount() {
    this.setState({ called: false, authProfile: null })

    window.ReactRouterAuth0Provider.computeAuthed()
      .then(() => {
        let authProfile = {}

        this.setState({ called: true })

        try {
          authProfile = window.ReactRouterAuth0Provider.getProfile()
        } catch (profileError) {
          console.log('Auth Callback Route: Could not get user profile info', profileError)
          return
        }

        window.ReactRouterAuth0Provider.setProfile(Object.assign({}, authProfile))
        this.setState({ authProfile })
      })
      .catch((err) => {
        console.log('Auth Callback Route: Could not compute user authentication', err)
      })
  }

  render() {
    if (this.state.called && this.state.authProfile) {
      return (
        <Redirect to={{
          pathname: window.ReactRouterAuth0Provider.getNextPath(),
          state: { from: this.props.location },
        }} />
      )
    }

    // could return loading here
    return null
  }
}