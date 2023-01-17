import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import { Link } from 'react-router-dom'
import { PrimaryLoadingButton } from 'components/StyledButton'
import { useAuth } from 'contexts'
import { useNavigate } from 'react-router'

const LoginView = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const auth = useAuth()
  const history = useNavigate()

  const login = async () => {
    const res = await auth.login(email, password)
    if (res) {
      history('/betting_provider')
    }
  }

  useEffect(() => {
    if (auth.isAuthenticated) {
      history('/betting_provider')
    }
  }, [])
  return (
    <div className="login-container row pt-4 pb-4 m-0">
      <div className="col-12 col-md-6">
        <div className="d-flex  mt-3 mt-md-5">
          <div className="login-box mx-4 p-4 radius text-left">
            <h3 className="welcome pt-3 pb-4">Log In</h3>
            <div className="login-form input-type">
              <form
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    login()
                  }
                }}
              >
                <TextField
                  label="Email"
                  variant="standard"
                  className="w-100 mb-4"
                  value={email}
                  error={
                    auth.error && auth.error.errorType === 1 ? true : false
                  }
                  helperText={
                    auth.error && auth.error.errorType === 1
                      ? auth.error.message
                      : ''
                  }
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  label="Password"
                  type="password"
                  variant="standard"
                  className="w-100 mb-4"
                  value={password}
                  error={
                    auth.error && auth.error.errorType === 2 ? true : false
                  }
                  helperText={
                    auth.error && auth.error.errorType === 2
                      ? auth.error.message
                      : ''
                  }
                  onChange={(e) => setPassword(e.target.value)}
                />
                <PrimaryLoadingButton
                  label="Log In"
                  className="w-100"
                  loading={auth.isAuthenticating}
                  onClick={login}
                />
              </form>
              <div className="d-flex justify-content-between mt-3 forgot-pass">
                <Link to="/register" className="small">
                  {`Don't have an account? Sign up`}
                </Link>
                <Link to="/forgot_password" className="small">
                  Forgot/Reset your password?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginView
