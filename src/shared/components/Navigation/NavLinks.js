import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import './NavLinks.css'

import { ContextAuth } from '../../context/auth'

export default (props) => {
  const auth = useContext(ContextAuth)
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>ALL USERS</NavLink>
      </li>
      {auth.isLoggedIn && <li>
        <NavLink to="/u1/places">MY PLACES</NavLink>
      </li>}
      {auth.isLoggedIn && <li>
        <NavLink to="/places/new">ADD PLACE</NavLink>
      </li>}
      {!auth.isLoggedIn && <li>
        <NavLink to="/auth">AUTHENTICATE</NavLink>
      </li>}
      {auth.isLoggedIn && <li>
        <button onClick={auth.logout}>LOGOUT</button>
      </li>}
    </ul>
  )
}