import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Auth from './auth'

class AuthCallbackRoute extends Route {
  componentWillMount() {
    this.setState({ called: false })

    Auth.computeAuthed()
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
          authProfile = Auth.getProfile()
        } catch (profileError) {
          logger.error('Callback Route: Could not get user profile info', profileError)
          return
        }

        Auth.setProfile(Object.assign({}, authProfile, { userId: context.userId }))
      })
  }

  render() {
    if (this.state.called && this.props.userId) {
      return (
        <Redirect to={{
          pathname: Auth.getNextPath(),
          state: { from: this.props.location },
        }}/>
      )
    }

    // Redirect new user that has refused access Auth0
    if (this.state.userRefusedAccess) {
      return (
        <Redirect to={{
          pathname: '/',
        }}/>
      )
    }

    // Redirect user that is not on whitelist
    if (this.state.userNotOnWhitelist) {
      return (
        <Redirect to={{
          pathname: `/request-access/${this.state.userNotOnWhitelist}`,
        }}/>
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
  ({ }),
)(AuthCallbackRoute)
