import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { AuthContext } from './AuthContext'
import authServices from 'services/authServices'
import axiosInstance from 'utils/axios'

const AuthProvider = ({ children }) => {
  const [isAuthenticated, userHasAuthenticated] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [profile, setProfile] = useState(null)
  const [error, setError] = useState(null)

  const login = async (email, password) => {
    try {
      setIsAuthenticating(true)

      const data = await authServices.login(email, password)
      if (data.user && data.token) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('neon-user', JSON.stringify(data.user))
        axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + data.token
      }

      setProfile(data.user)
      userHasAuthenticated(true)
      setIsAuthenticating(false)
      setError(null)
      return true
    } catch (err) {
      userHasAuthenticated(false)
      setIsAuthenticating(false)
      setError({ message: err.errorMsg, errorType: err.errorType })
      return false
    }
  }

  const register = async (data) => {
    try {
      setIsAuthenticating(true)
      const res = await authServices.register(data)
      if (res.user && res.token) {
        localStorage.setItem('token', res.token)
        localStorage.setItem('neon-user', JSON.stringify(res.user))
        axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + data.token
      }

      setProfile(res.user)
      userHasAuthenticated(true)
      setIsAuthenticating(false)
      setError(null)
      return true
    } catch (err) {
      userHasAuthenticated(false)
      setIsAuthenticating(false)
      setError({ message: err.errorMsg, errorType: err.errorType })
      return false
    }
  }

  const logout = () => {
    authServices.logout(true)
    userHasAuthenticated(false)
    localStorage.setItem('neon-user', null)
    setProfile(null)
  }

  const setProfiles = (data) => {
    setProfile(data)
    localStorage.setItem('neon-user', JSON.stringify(data))
  }

  useEffect(() => {
    authServices
      .isAuthenticated()
      .then((isLoggedIn) => {
        userHasAuthenticated(isLoggedIn)
        if (isLoggedIn) {
          const token = localStorage.getItem('token')
          axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + token
          setProfile(JSON.parse(localStorage.getItem('neon-user')))
        }
      })
      .catch((error) => {
        console.log(error)
        userHasAuthenticated(false)
      })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAuthenticating,
        profile,
        error,
        setProfile: setProfiles,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.element
}
export default AuthProvider
