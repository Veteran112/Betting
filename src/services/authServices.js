import { RES_ERROR } from 'config/CONSTANTS'
import APIConstants from './CONSTANTS'
import jwt from 'jwt-decode'
import axiosInstance from 'utils/axios'

class AuthService {
  constructor() {}

  isAuthenticated = async () =>
    new Promise((resolve, reject) => {
      try {
        const token = localStorage.getItem('token')
        if (!token) resolve(false)
        const payload = jwt(token)
        if (payload.iat) {
          resolve(true)
        } else {
          this.logout()
          resolve(false)
        }
      } catch (error) {
        reject(error)
      }
    })

  login = async (email, password) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(APIConstants.LOGIN, { email, password })
        .then((response) => {
          const resData = response.data
          if (resData.token) {
            resolve({
              token: resData.token,
              user: {
                ...resData.user,
                userType: 'admin'
              }
            })
          } else {
            reject({
              errorType: response.data.errorType,
              errorMsg: response.data.error
            })
          }
        })
        .catch((error) => {
          console.log(error.response)
          reject({
            errorType: 3,
            errorMsg: RES_ERROR
          })
        })
    })
  }

  register = async (data) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(APIConstants.REGISTER, { ...data })
        .then((response) => {
          const resData = response.data
          if (resData.token) {
            resolve({
              token: resData.token,
              user: {
                ...resData.user,
                userType: 'admin'
              }
            })
          } else {
            reject({
              errorType: response.data.errorType,
              errorMsg: response.data.error
            })
          }
        })
        .catch((error) => {
          console.log(error.response)
          reject({
            errorType: 3,
            errorMsg: RES_ERROR
          })
        })
    })
  }

  logout = async (navigateToLogin = false) => {
    delete axiosInstance.defaults.headers['Authorization']
    localStorage.removeItem('token')
    localStorage.clear()
    if (navigateToLogin) {
      window.location.href = '/'
    }
  }
}

export default new AuthService()
