import React from 'react'
import { mount, shallow } from 'enzyme'
import { Redirect } from 'react-router-dom'

import LoginRoute from '../src/route.login'

describe('Login Route', () => {
  let auth0MockResult

  beforeEach(() => {
    auth0MockResult = {
      login: jest.fn(),
      isLoggedIn: jest.fn(),
      options: { rootRoute: '/' },
    }

    window.ReactRouterAuth0Provider = auth0MockResult
  })

  it('renders when user is logged in', () => {
    const wrapper = shallow(<LoginRoute />)

    expect(wrapper.html()).toBe(null)
    expect(wrapper.find(Redirect)).toHaveLength(0)
  })

  it('redirects to root when user is logged in', () => {
    window.ReactRouterAuth0Provider.isLoggedIn = () => true

    const wrapper = shallow(<LoginRoute />)
    expect(wrapper.find(Redirect)).toHaveLength(1)
  })

  it('should call auth0 login lock screen when user is not logged in', () => {
    window.ReactRouterAuth0Provider.isLoggedIn = () => false
    window.ReactRouterAuth0Provider.login = jest.fn().mockReturnValue({ loginCalled: true })

    const wrapper = shallow(<LoginRoute />)
    const loginRoute = wrapper.instance()

    expect(window.ReactRouterAuth0Provider.login).toHaveBeenCalled()
    expect(loginRoute.login).toEqual({ loginCalled: true })
  })

  it('should not call auth0 login lock screen when user is already logged in', () => {
    window.ReactRouterAuth0Provider.isLoggedIn = () => true

    shallow(<LoginRoute />)

    expect(window.ReactRouterAuth0Provider.login).not.toHaveBeenCalled()
  })

  it('should hide auth0 login lock screen leaving the login route', () => {
    const authLock = { hide: jest.fn() }
    window.ReactRouterAuth0Provider.isLoggedIn = () => false
    window.ReactRouterAuth0Provider.login = jest.fn().mockReturnValue(authLock)

    const wrapper = shallow(<LoginRoute />)
    const loginRoute = wrapper.instance()
    wrapper.unmount()

    expect(authLock.hide).toHaveBeenCalled()
    expect(loginRoute.login).toBeNull()
  })
})