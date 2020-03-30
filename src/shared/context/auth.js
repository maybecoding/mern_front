import { createContext } from 'react'

export const ContextAuth = createContext({
  isLoggedIn: false,
  userId: undefined, 
  login: () => {},
  logout: () => {},
})