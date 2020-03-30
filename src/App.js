import React, { useCallback, useState } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import Users from './user/pages/Users'
import Auth from './user/pages/Auth'
import NewPlace from './places/pages/NewPlace'
import EditPlace from './places/pages/EditPlace'
import UserPlaces from './places/pages/UserPlaces'
import MainNavigation from './shared/components/Navigation/MainNavigation'
import { ContextAuth } from './shared/context/auth'

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState()

  const login = useCallback(uid => {
    setIsLoggedIn(true)
    setUserId(uid)
  }, [])
  const logout = useCallback(() => {
    setIsLoggedIn(false)
    setUserId(undefined)
  }, [])

  const routes = isLoggedIn ? (
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
    <ContextAuth.Provider value={{ isLoggedIn, userId, login, logout }}>
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </ContextAuth.Provider>
  )
}

export default App
