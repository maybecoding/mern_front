import { createContext } from 'react'

export const ContextAuth = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {}
})