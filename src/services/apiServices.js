import axiosInstance from 'utils/axios'
import { RES_ERROR } from 'config/CONSTANTS'
import authServices from 'services/authServices'

const getAPIService = (url, data = {}, method = 'post') => {
  return new Promise((resolve, reject) => {
    // axiosInstance.
    axiosInstance({
      method: method,
      url: url,
      data: data
    })
      .then((res) => {
        if (res.data.errorType === 4) {
          // Invalid Token and LogOut
          authServices.logout(true)
          resolve('logout')
        }
        if (res.data.status === 'Success') {
          localStorage.setItem('token', res.headers.token)
          resolve(res.data.data)
        } else reject(res.data.message)
      })
      .catch((err) => {
        console.log(err)
        reject(RES_ERROR)
      })
  })
}

export { getAPIService }
