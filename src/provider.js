import React from 'react'
import Auth from './auth'

const getOrCreateReactRouterAuth0Provider = (domain, clientId, options) => {
  window.ReactRouterAuth0Provider = window.ReactRouterAuth0Provider || new Auth(domain, clientId, options)
}

export default class AuthProvider extends React.Component {
  constructor(props) {
    super(props)

    const { domain, clientId } = this.props

    if (!domain || !clientId) {
      throw new Error(
        'Auth0 Provider needs to receive props `domain` and `clientId`.'
      )
    }

    const options = { ...this.props }
    delete options.children
    delete options.domain
    delete options.clientId

    getOrCreateReactRouterAuth0Provider(domain, clientId, options)
  }

  render() {
    return React.Children.only(this.props.children)
  }
}