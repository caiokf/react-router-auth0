# react-router-auth0

Library to get started quickly with Auth0 using React and React-Router.

## Installation

Install `react-router-auth0` via yarn or npm.

```bash
$ yarn add react-router-auth0
```

## Usage

Inside your router, add an `AuthProvider` and your routes.

```
import {
  PrivateRoute,
  LoginRoute,
  LogoutRoute,
  LandingPageRoute,
  AuthCallbackRoute,
  AuthProvider,
} from 'react-router-auth0'

const authedRoutes = (
  <AuthProvider
    domain={'your_domain.auth0.com'}
    clientId={'your_client_id'}
    audience={'https://your_domain.auth0.com/userinfo'}
  >
    <Switch>
      <LandingPageRoute exact path="/"
        landingUrl="http://my_landing_page"
        loggedInPath="/home" />

      <LoginRoute exact path="/login" />
      <LogoutRoute path='/logout' redirect='/' />
      <AuthCallbackRoute path='/auth0-callback' />

      <PrivateRoute
    </Switch>
</AuthProvider>
)
```

And add it to your main router like this:
```
const Router = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>

        {authedRoutes}

      </ConnectedRouter>
    </Provider>
  )
}
```

### Component Descriptions:

`AuthProvider`: Main component which will bootstrap you auth0 client.

`PrivateRoute`: Any route the can only be accessed when logged in. If user is not logged in, redirects to the login route.

`LoginRoute`: Takes you to the auth0 lock screen

`LogoutRoute`: Handles auth0 logout and redirects you to the initial/landing page.

`LandingPageRoute`: When hit, will display any url passed through `landingUrl` prop when the user is not logged in. This can be a separate app/page, with or without react, which gives you the option of having one plain html/css lightweight landing page. If the user is logged in, redirects to url passed through `loggedInPath` prop.

`AuthCallbackRoute`: Route which Auth0 will callback once user logs in. Make sure to enable this url on your Auth0 management console.

## LICENSE

MIT
