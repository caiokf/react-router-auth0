import React from 'react'
import { shallow } from 'enzyme'
import { Redirect } from 'react-router-dom'

import CallbackRoute from '../src/route.callback'

describe('Callbback Route', () => {
  let auth0MockResult

  beforeEach(() => {
    auth0MockResult = {
      logout: jest.fn(),
      computeAuthed: jest.fn().mockReturnValue(Promise.resolve()),
      getProfile: jest.fn(),
      setProfile: jest.fn(),
    }

    window.ReactRouterAuth0Provider = auth0MockResult
  })

  it('should call return null when rendering before computing user auth', () => {
    window.ReactRouterAuth0Provider.computeAuthed = jest.fn().mockReturnValue(Promise.reject())

    const wrapper = shallow(<CallbackRoute />)
    expect(wrapper).toEqual({})
  })


  it('should redirect to nextPath after computing user auth', () => {
    window.ReactRouterAuth0Provider.getNextPath = jest.fn().mockReturnValue('/next')

    const wrapper = shallow(<CallbackRoute />)
    wrapper.setState({ called: true, authProfile: {} })
    wrapper.update()

    const redirect = wrapper.find(Redirect)

    expect(redirect).toHaveLength(1)
    expect(redirect.prop('to').pathname).toEqual('/next')
  })
})
