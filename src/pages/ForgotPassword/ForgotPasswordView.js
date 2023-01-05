import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import { PrimaryLoadingButton } from '../../components/StyledButton'
import { Link } from 'react-router-dom'
import { getAPIService } from 'services/apiServices'
import CONSTANTS from 'services/CONSTANTS'
import { INVALID_EMAIL } from 'config/CONSTANTS'
import { validateEmail } from 'services/validators'
import alert from 'utils/alert'

const ForgotPasswordView = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [error, setError] = useState(false)
  const handleSubmitRequest = async () => {
    if (!validateEmail(email)) {
      alert(false, INVALID_EMAIL)
      return
    }
    setIsLoading(true)
    try {
      await getAPIService(CONSTANTS.FORGOT_PASSWORD, {
        email: email
      })
      setIsEmailSent(true)
    } catch (error) {
      alert(false, error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (email && email.length > 2) {
      setError(!validateEmail(email))
    }
  }, [email])

  const loginScreen = () => {
    return (
      <>
        <h2 className="welcome pt-3 pb-4 shade-blue">Forgot your Password?</h2>
        <div className="login-form input-type">
          <form
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                console.log('Enter')
              }
            }}
          >
            <TextField
              label="Email"
              variant="standard"
              className="w-100 mb-4"
              value={email}
              error={error}
              helperText={error ? INVALID_EMAIL : ''}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PrimaryLoadingButton
              label="Submit"
              className="w-100"
              loading={isLoading}
              onClick={handleSubmitRequest}
              disabled={isLoading}
            />
          </form>
        </div>
      </>
    )
  }
  const emailSentScreen = () => {
    return (
      <>
        <h2 className="welcome pt-3 pb-4 shade-blue">Check Your Inbox</h2>
        <div>
          <div className="text-decoration-underline">
            Password reset email has been sent to
          </div>
          <div className="text-primary">{email}</div>
        </div>
      </>
    )
  }
  return (
    <div className="login-container row pt-4 pb-4 m-0">
      <div className="col-12 col-md-6">
        <div className="d-flex  justify-content-center mt-3 mt-md-5">
          <div className="login-box mx-4 p-4 radius text-center">
            {isEmailSent ? emailSentScreen() : loginScreen()}
            <div className="mt-3">
              <Link to="/home" className="small text-secondary">
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordView
