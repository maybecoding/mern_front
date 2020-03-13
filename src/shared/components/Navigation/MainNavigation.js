import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './MainNavigation.css'
import './MainHeader'
import MainHeader from './MainHeader'
import NavLinks from './NavLinks'
import SideDrawer from './SideDrawer'
import Backdrop from '../UIElements/Backdrop'


export default (props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <React.Fragment>
      {isDrawerOpen && <Backdrop onClick={() => setIsDrawerOpen(false)} />}
      <SideDrawer show={isDrawerOpen} onClick={() => setIsDrawerOpen(false)}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>
      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={() => setIsDrawerOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to='/u1/places'>Your places</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  )
}