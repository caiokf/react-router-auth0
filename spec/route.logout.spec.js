import React from 'react'
import { shallow } from 'enzyme'
import { Redirect } from 'react-router-dom'

import LogoutRoute from '../src/route.logout'

describe('Logout Route', () => {
  let auth0MockResult

  beforeEach(() => {
    auth0MockResult = {
      logout: jest.fn(),
      options: {
        rootRoute: '/',
      },
    }

    window.ReactRouterAuth0Provider = auth0MockResult
  })

  it('should call logout when rendered', () => {
    shallow(<LogoutRoute />)

    expect(auth0MockResult.logout).toHaveBeenCalled()
  })

  it('redirects when rendered', () => {
    window.ReactRouterAuth0Provider.isLoggedIn = jest.fn().mockReturnValue(true)

    const wrapper = shallow(<LogoutRoute redirect='/logged-out' />)
    const redirect = wrapper.find(Redirect)

    expect(redirect).toHaveLength(1)
    expect(redirect.prop('to').pathname).toEqual('/logged-out')
  })

  it('redirects to root route when redirect prop not present', () => {
    window.ReactRouterAuth0Provider.options.rootRoute = '/default'

    const wrapper = shallow(<LogoutRoute />)
    const redirect = wrapper.find(Redirect)

    expect(redirect).toHaveLength(1)
    expect(redirect.prop('to').pathname).toEqual('/default')
  })
})
