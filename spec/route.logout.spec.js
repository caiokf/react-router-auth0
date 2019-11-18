import React from 'react'
import { shallow } from 'enzyme'
import { Redirect } from 'react-router-dom'

import LogoutRoute from '../src/route.logout'

describe('Logout Route', () => {
  let auth0MockResult

  beforeEach(() => {
    auth0MockResult = {
      logout: jest.fn(),
    }

    window.ReactRouterAuth0Provider = auth0MockResult
  })

  it('shoul call logout when rendered', () => {
    shallow(<LogoutRoute />)

    expect(auth0MockResult.logout).toHaveBeenCalled()
  })

  it('redirects when rendered', () => {
    window.ReactRouterAuth0Provider.isLoggedIn = () => true

    const wrapper = shallow(<LogoutRoute />)
    expect(wrapper.find(Redirect)).toHaveLength(1)
  })
})
