import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { AuthContext } from './AuthContext'
import authServices from 'services/authServices'
import { validateEmail } from 'services/validators'
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
      localStorage.setItem('token', data.token)
      localStorage.setItem('neon-user', JSON.stringify(data.user))
      axiosInstance.defaults.headers.common['Authorization'] = data.token
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
    if (
      data.email === '' ||
      data.firstName === '' ||
      data.lastName === '' ||
      data.phone === '' ||
      data.location === '' ||
      data.password === '' ||
      data.confirmPassword === ''
    ) {
      setError({
        message: 'Fill all the gaps'
      })
      return false
    }

    if (!validateEmail(data.email)) {
      setError({
        message: 'Input correct email!'
      })
      return false
    }

    if (data.password !== data.confirmPassword) {
      setError({
        message: 'Password does not match!'
      })
      return false
    }
    if (String(data.password.length) < 8) {
      setError({
        message: 'Password should be longer than 8 characters'
      })
      return false
    }
    if (data.userType === 'interpreter') {
      if (data.language === '' || data.experience === '') {
        setError({
          message: 'Fill all the gaps'
        })
        return false
      }
    } else {
      if (data.company === '') {
        setError({
          message: 'Fill all the gaps'
        })
        return false
      }
    }
    console.log('validation susccess')
    try {
      setIsAuthenticating(true)
      const res = await authServices.register(data)
      localStorage.setItem('token', res.token)
      localStorage.setItem('neon-user', JSON.stringify(res.user))
      axiosInstance.defaults.headers.common['Authorization'] = res.token
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
          axiosInstance.defaults.headers.common['Authorization'] = token
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
