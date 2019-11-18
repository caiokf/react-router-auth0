import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class AuthCallbackRoute extends Route {
  componentWillMount() {
    this.setState({ called: false })

    window.ReactRouterAuth0Provider.computeAuthed()
      .then(async () => {
        let context = {}
        let authProfile = {}

        this.setState({ called: true })

        // try {
        //   context = await this.props.getUserSession()
        // } catch (sessionError) {
        //   logger.error('Callback Route: Could not get user session', sessionError)
        //   return
        // }

        try {
          authProfile = window.ReactRouterAuth0Provider.getProfile()
        } catch (profileError) {
          logger.error('Callback Route: Could not get user profile info', profileError)
          return
        }

        window.ReactRouterAuth0Provider.setProfile(Object.assign({}, authProfile, { userId: context.userId }))
      })
  }

  render() {
    if (this.state.called && this.props.userId) {
      return (
        <Redirect to={{
          pathname: window.ReactRouterAuth0Provider.getNextPath(),
          state: { from: this.props.location },
        }} />
      )
    }

    // Redirect new user that has refused access Auth0
    if (this.state.userRefusedAccess) {
      return (
        <Redirect to={{
          pathname: '/',
        }} />
      )
    }

    // Redirect user that is not on whitelist
    if (this.state.userNotOnWhitelist) {
      return (
        <Redirect to={{
          pathname: `/request-access/${this.state.userNotOnWhitelist}`,
        }} />
      )
    }

    // could return loading here
    return null
  }
}
export default connect(
  state => ({
    userId: state.user.get('userId'),
  }),
  ({}),
)(AuthCallbackRoute)
