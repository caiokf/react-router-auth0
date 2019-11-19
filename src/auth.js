import Auth0 from 'auth0-js'
import decode from 'jwt-decode'
import { EventEmitter } from 'events'

const AUTH_NEXT_PATH_KEY = 'next_path'
const AUTH_ID_TOKEN_KEY = 'id_token'
const AUTH_ACCESS_TOKEN_KEY = 'access_token'
const AUTH_PROFILE_KEY = 'profile'

export default class Auth {
  constructor(domain, clientId, opts) {
    this.options = {
      audience: '',
      callbackRoute: '/auth0-callback',
      rootRoute: '/',
      loginRoot: '/login',
      responseType: 'token id_token',
      scope: 'openid profile email',

      ...opts,
    }

    const auth0 = new Auth0.WebAuth({
      domain: domain,
      clientID: clientId,
      audience: this.options.audience,
      redirectUri: `${window.location.origin}${this.options.callbackRoute}`,
      responseType: this.options.responseType,
      scope: this.options.scope,
    })

    this.events = new EventEmitter()
    this.lock = auth0
  }

  computeAuthed() {
    return new Promise((resolve, reject) => {
      this.lock.parseHash({}, (err, authResult) => {
        if (err) {
          return reject(err)
        }

        this.setIdToken(authResult.idToken)
        this.setAccessToken(authResult.accessToken)

        return this.lock.client.userInfo(authResult.accessToken, (error, profile) => {
          if (error) {
            this.setProfile({ error })
            return reject(error)
          }
          this.setProfile(profile)
          return resolve(profile)
        })
      })
    })
  }

  login(options) {
    this.lock.authorize(options)

    return {
      hide() {
        this.lock.hide()
      },
    }
  }

  logout() {
    localStorage.removeItem(AUTH_ID_TOKEN_KEY)
    localStorage.removeItem(AUTH_ACCESS_TOKEN_KEY)
    localStorage.removeItem(AUTH_PROFILE_KEY)
  }

  getIdToken() {
    return localStorage.getItem(AUTH_ID_TOKEN_KEY)
  }

  setIdToken(idToken) {
    localStorage.setItem(AUTH_ID_TOKEN_KEY, idToken)
  }

  getAccessToken() {
    return localStorage.getItem(AUTH_ACCESS_TOKEN_KEY)
  }

  setAccessToken(accessToken) {
    localStorage.setItem(AUTH_ACCESS_TOKEN_KEY, accessToken)
  }

  getNextPath() {
    return localStorage.getItem(AUTH_NEXT_PATH_KEY) || this.options.rootRoute
  }

  setNextPath(nextPath) {
    localStorage.setItem(AUTH_NEXT_PATH_KEY, nextPath)
  }

  isLoggedIn() {
    const idToken = this.getIdToken()
    return idToken && !this.isTokenExpired(idToken)
  }

  getTokenExpirationDate(encodedToken) {
    const token = decode(encodedToken)
    if (!token.exp) {
      return null
    }

    const date = new Date(0)
    date.setUTCSeconds(token.exp)

    return date
  }

  isTokenExpired(token) {
    const expirationDate = this.getTokenExpirationDate(token)
    return expirationDate < new Date()
  }

  setProfile(profile) {
    localStorage.setItem(AUTH_PROFILE_KEY, JSON.stringify(profile))
  }

  getProfile() {
    return JSON.parse(localStorage.getItem(AUTH_PROFILE_KEY))
  }
}
