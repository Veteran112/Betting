// A wrapper for <Route> that redirects to the login

import React from 'react'
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import jwt from 'jwt-decode'
import axiosInstance from 'utils/axios'

function PrivateRoute({ children }) {
  try {
    const token = localStorage.getItem('token')
    let isLoggedIn = false
    if (token) {
      const payload = jwt(token)
      console.log(payload, Date.now())
      if (payload.expire > Date.now()) {
        isLoggedIn = true
      }
    }
    if (!isLoggedIn) return <Navigate to="/" />
    axiosInstance.defaults.headers.common['Authorization'] = token
    return children
  } catch (error) {
    return <Navigate to="/" />
  }
}

PrivateRoute.propTypes = {
  children: PropTypes.element
}

export default PrivateRoute
