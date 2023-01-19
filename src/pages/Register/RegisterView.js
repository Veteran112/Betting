import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import { Link } from 'react-router-dom'
import { PrimaryLoadingButton } from 'components/StyledButton'
import { useAuth } from 'contexts'
import { useNavigate } from 'react-router'
import { validateEmail } from 'services/validators'
import {
  INVALID_EMAIL,
  INVALID_MATCH,
  INVALID_LENGTH,
  NOT_FILL
} from 'config/CONSTANTS'
import alert from 'utils/alert'

const RegisterView = () => {
  const [data, setData] = useState({
    email: '',
    fname: '',
    lname: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState(false)
  const auth = useAuth()
  const history = useNavigate()

  const register = async () => {
    if (
      data.email === '' ||
      data.fname === '' ||
      data.lname === '' ||
      data.password === ''
    ) {
      alert(false, NOT_FILL)
      return
    }
    if (!validateEmail(data.email)) {
      alert(false, INVALID_EMAIL)
      return
    }
    if (String(data.password.length) < 8) {
      alert(false, INVALID_LENGTH)
      return
    }
    if (data.password !== data.confirmPassword) {
      alert(false, INVALID_MATCH)
      return
    }
    try {
      const res = await auth.register(data)
      if (res) {
        history('/bet')
      }
    } catch (error) {
      alert(false, error)
    }
  }
  useEffect(() => {
    if (auth.isAuthenticated) {
      history('/bet')
    }
  }, [])

  useEffect(() => {
    if (data.email && data.email.length > 2) {
      setError(!validateEmail(data.email))
    }
  }, [data.email])

  return (
    <div className="register-container row pt-4 pb-4 m-0">
      <div className="col-12 col-md-6">
        <div className="d-flex  mt-3 mt-md-5">
          <div className="register-box mx-4 p-4 radius text-center">
            <div className="login-form input-type">
              <form
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    register()
                  }
                }}
              >
                <TextField
                  label="First Name"
                  variant="standard"
                  className="w-100 mb-4"
                  value={data.fname}
                  onChange={(e) => setData({ ...data, fname: e.target.value })}
                />
                <TextField
                  label="Last Name"
                  variant="standard"
                  className="w-100 mb-4"
                  value={data.lname}
                  onChange={(e) => setData({ ...data, lname: e.target.value })}
                />
                <TextField
                  label="Email"
                  variant="standard"
                  className="w-100 mb-4"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  error={error}
                  helperText={error ? INVALID_EMAIL : ''}
                />
                <TextField
                  label="Password"
                  type="password"
                  variant="standard"
                  className="w-100 mb-4"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
                <TextField
                  label="Confirm Password"
                  type="password"
                  variant="standard"
                  className="w-100 mb-4"
                  value={data.confirmPassword}
                  onChange={(e) =>
                    setData({ ...data, confirmPassword: e.target.value })
                  }
                />
                <PrimaryLoadingButton
                  label="Sign Up"
                  className="w-100"
                  loading={auth.isAuthenticating}
                  onClick={register}
                />
              </form>
              <div className="d-flex justify-content-end mt-3 forgot-pass">
                <Link to="/login" className="small">
                  {`Already have an account? Sign in`}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterView
