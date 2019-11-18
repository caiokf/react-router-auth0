import React from 'react'
import { mount, shallow } from 'enzyme'

import AuthProvider from '../src/provider'

describe('Auth0 Provider', () => {
  let auth0MockFn
  let auth0MockResult

  beforeEach(() => {
    auth0MockResult = {
      computeAuthed: jest.fn(),
      login: jest.fn(),
      logout: jest.fn(),
      isLoggedIn: jest.fn(),
      getTokenExpirationDate: jest.fn(),
      isTokenExpired: jest.fn(),
      getIdToken: jest.fn(),
      setIdToken: jest.fn(),
      getAccessToken: jest.fn(),
      setAccessToken: jest.fn(),
      getNextPath: jest.fn(),
      setNextPath: jest.fn(),
      getProfile: jest.fn(),
      setProfile: jest.fn(),
    }

    auth0MockFn = jest.fn().mockReturnValue(auth0MockResult)
    window.ReactRouterAuth0Provider = auth0MockFn
  })

  it('requires domain prop', () => {
    expect(() => {
      shallow(
        <AuthProvider clientId={'12345'}>
          <div />
        </AuthProvider>
      );
    }).toThrow(/Auth0 Provider needs to receive props `domain` and `clientId`./);
  })

  it('requires clientId prop', () => {
    expect(() => {
      shallow(
        <AuthProvider domain={'12345'}>
          <div />
        </AuthProvider>
      );
    }).toThrow(/Auth0 Provider needs to receive props `domain` and `clientId`./);
  })

  it('throws without children', () => {
    expect(() => shallow(<AuthProvider domain="123" clientId="123" />)).toThrow(
      'React.Children.only expected to receive a single React element child'
    )
  })

  it('throws with more than one child', () => {
    expect(() => shallow(
      <AuthProvider domain="123" clientId="123">
        <div />
        <div />
      </AuthProvider>
    )).toThrow(
      'React.Children.only expected to receive a single React element child'
    )
  })

  it('throws with more than one child', () => {
    expect(() => shallow(
      <AuthProvider domain="123" clientId="123">
        <div />
        <div />
      </AuthProvider>
    )).toThrow(
      'React.Children.only expected to receive a single React element child'
    )
  })

  it('renders its single child', () => {
    const wrapper = shallow(
      <AuthProvider domain="123" clientId="123">
        <form>
          <input />
        </form>
      </AuthProvider>
    )

    expect(wrapper.html()).toBe('<form><input/></form>')
  })

  it('initializes Auth0 with domain, clientId and empty options', () => {
    shallow(
      <AuthProvider domain="any_domain" clientId="any_clientId">
        <form />
      </AuthProvider>
    )

    expect(auth0MockFn).toHaveBeenCalledWith('any_domain', 'any_clientId', {})
  })

  it('initializes Auth0 with domain, clientId and props as options', () => {
    shallow(
      <AuthProvider domain="any_domain" clientId="any_clientId" scope="email profile openid">
        <form />
      </AuthProvider>
    )

    expect(auth0MockFn).toHaveBeenCalledWith('any_domain', 'any_clientId', { scope: 'email profile openid' })
  })
})