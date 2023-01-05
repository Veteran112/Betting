import { createContext } from 'react'

const initialState = {
  isAuthenticated: false,
  isAuthenticating: true,
  profile: {},
  error: null,
  setProfile: () => {},
  login: () => {
    return Promise.resolve()
  },
  register: () => {
    return Promise.resolve()
  },
  logout: () => {
    return Promise.resolve()
  }
}

export const AuthContext = createContext(initialState)
