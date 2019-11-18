import React from 'react'
import { mount, shallow } from 'enzyme'

import AuthProvider from '../src/provider'
import Auth from '../src/auth'
jest.mock('../src/auth')

beforeEach(() => {
  Auth.mockClear()
})

describe('Auth0 Provider', () => {
  beforeEach(() => {
    window.ReactRouterAuth0Provider = null
    Auth.mockClear()
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

    expect(Auth).toHaveBeenCalledWith('any_domain', 'any_clientId', {})
  })

  it('initializes Auth0 with domain, clientId and props as options', () => {
    shallow(
      <AuthProvider domain="any_domain" clientId="any_clientId" scope="email profile openid">
        <form />
      </AuthProvider>
    )

    expect(Auth).toHaveBeenCalledWith('any_domain', 'any_clientId', { scope: 'email profile openid' })
  })
})
