const BASE_URL = `${
  process.env.REACT_APP_BASE_URL
    ? process.env.REACT_APP_BASE_URL
    : 'https://betting-backend-three.vercel.app'
}/api`
const GET_ALL_USERS = `${BASE_URL}/users`
const LOGIN = `${BASE_URL}/auth/signin`
const REGISTER = `${BASE_URL}/auth/signup`
const GET_USERS = `${BASE_URL}/users/get`
const CREATE_USER = `${BASE_URL}/users/create`
const UPDATE_USER = `${BASE_URL}/users`
const DELETE_USER = `${BASE_URL}/users`
const BLOCK_USER = `${BASE_URL}/users/block`
const CHANGE_USER_PASSWORD = `${BASE_URL}/users/change_password`
const FORGOT_PASSWORD = `${BASE_URL}/auth/forgot_password`
const RESET_PASSWORD = `${BASE_URL}/auth/recover_password`
const PROVIDERS = `${BASE_URL}/providers`
const COMMANDS = `${BASE_URL}/commands`
const HISTORY = `${BASE_URL}/history`
const BETS = `${BASE_URL}/bets`

export default {
  GET_ALL_USERS,
  LOGIN,
  REGISTER,
  CREATE_USER,
  GET_USERS,
  UPDATE_USER,
  DELETE_USER,
  BLOCK_USER,
  CHANGE_USER_PASSWORD,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  PROVIDERS,
  COMMANDS,
  HISTORY,
  BETS
}
