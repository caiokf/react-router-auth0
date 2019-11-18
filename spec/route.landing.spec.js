import React from 'react'
import { shallow } from 'enzyme'
import { Redirect } from 'react-router-dom'

import LandingRoute from '../src/route.landing'

describe('Landing Route', () => {
  let auth0MockResult

  beforeEach(() => {
    auth0MockResult = {
      isLoggedIn: jest.fn(),
    }

    window.ReactRouterAuth0Provider = auth0MockResult
  })

  it('should redirect to loggedInPath when user is logged in', () => {
    auth0MockResult.isLoggedIn = jest.fn().mockReturnValue(true)

    const wrapper = shallow(<LandingRoute path="http://landing-page.com" loggedInPath="/dashboard" />)
    const redirect = wrapper.find(Redirect)

    expect(window.ReactRouterAuth0Provider.isLoggedIn).toHaveBeenCalled()
    expect(redirect).toHaveLength(1)
    expect(redirect.prop('to').pathname).toEqual('/dashboard')
  })

  it('should redirect to the configured path when user is not logged in', () => {
    auth0MockResult.isLoggedIn = jest.fn().mockReturnValue(false)
    window.location.replace = jest.fn()

    shallow(<LandingRoute path="http://landing-page.com" loggedInPath="/dashboard" />)

    expect(window.ReactRouterAuth0Provider.isLoggedIn).toHaveBeenCalled()
    expect(window.location.replace).toHaveBeenCalledWith('http://landing-page.com')
  })
})
