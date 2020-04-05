import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import Users from './user/pages/Users'
import Auth from './user/pages/Auth'
import NewPlace from './places/pages/NewPlace'
import EditPlace from './places/pages/EditPlace'
import UserPlaces from './places/pages/UserPlaces'

import MainNavigation from './shared/components/Navigation/MainNavigation'
import { AuthContext } from './shared/context/auth'
import { useAuth } from './shared/hooks/auth'


const App = () => {
  const { userId, token, login, logout } = useAuth()
  const routes = !!token ? (
    <Switch>
      <Route path='/' exact>
        <Users />
      </Route>
      <Route path='/:userId/places' exact>
        <UserPlaces />
      </Route>
      <Route path='/places/new' exact>
        <NewPlace />
      </Route>
      <Route path='/places/:placeId' exact>
        <EditPlace />
      </Route>
      <Redirect to='/' />
    </Switch>
  ) : (
      <Switch>
        <Route path='/' exact>
          <Users />
        </Route>
        <Route path='/:userId/places' exact>
          <UserPlaces />
        </Route>
        <Route path='/auth' exact>
          <Auth />
        </Route>
        <Redirect to='/auth' />
      </Switch>
    )

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!token, userId, login, logout, token }}>
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
