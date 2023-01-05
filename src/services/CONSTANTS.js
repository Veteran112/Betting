const BASE_URL = `${
  process.env.REACT_APP_BASE_URL
    ? process.env.REACT_APP_BASE_URL
    : 'http://164.92.101.70'
}/api/v1`
const GET_ALL_USERS = `${BASE_URL}/data/users`
const LOGIN = `${BASE_URL}/auth/login`
const REGISTER = `${BASE_URL}/auth/register`
const GET_USERS = `${BASE_URL}/users/get`
const UPDATE_USER = `${BASE_URL}/users/update`
const DELETE_USER = `${BASE_URL}/users/delete`
const CHANGE_USER_PASSWORD = `${BASE_URL}/users/change_password`
const FORGOT_PASSWORD = `${BASE_URL}/auth/forgot_password`
const RESET_PASSWORD = `${BASE_URL}/auth/recover_password`
const RESEND_VERIFY_EMAIL = `${BASE_URL}/users/resend_verify_email`
const VERIFY_EMAIL = `${BASE_URL}/users/verify_email`
const GET_WORKTIME = `${BASE_URL}/worktime/get`
const ADD_WORKTIME = `${BASE_URL}/worktime/add`
const UPDATE_WORKTIME = `${BASE_URL}/worktime/update`
const DELETE_WORKTIME = `${BASE_URL}/worktime/delete`

export default {
  GET_ALL_USERS,
  LOGIN,
  REGISTER,
  GET_USERS,
  UPDATE_USER,
  DELETE_USER,
  CHANGE_USER_PASSWORD,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  GET_WORKTIME,
  ADD_WORKTIME,
  UPDATE_WORKTIME,
  DELETE_WORKTIME,
  VERIFY_EMAIL,
  RESEND_VERIFY_EMAIL
}
