import React from 'react'
import { shallow } from 'enzyme'
import { Redirect, Route } from 'react-router-dom'

import PrivateRoute from '../src/route.private'

describe('Private Route', () => {
  let auth0MockResult

  beforeEach(() => {
    auth0MockResult = {
      isLoggedIn: jest.fn(),
      setNextPath: jest.fn(),
      options: {
        loginRoot: '/login',
      },
    }

    window.ReactRouterAuth0Provider = auth0MockResult
  })

  it('should set a return path and redirect when user is not logged in', () => {
    auth0MockResult.isLoggedIn = jest.fn().mockReturnValue(false)

    const wrapper = shallow(<PrivateRoute path="/home" />)

    expect(window.ReactRouterAuth0Provider.isLoggedIn).toHaveBeenCalled()
    expect(window.ReactRouterAuth0Provider.setNextPath).toHaveBeenCalled()
    expect(wrapper.find(Redirect)).toHaveLength(1)
  })


  it('should render a react router Route when user is logged in', () => {
    auth0MockResult.isLoggedIn = jest.fn().mockReturnValue(true)

    const wrapper = shallow(<PrivateRoute path="/home" />)

    expect(window.ReactRouterAuth0Provider.isLoggedIn).toHaveBeenCalled()
    expect(window.ReactRouterAuth0Provider.setNextPath).not.toHaveBeenCalled()
    expect(wrapper.find(Route)).toHaveLength(1)
  })
})
