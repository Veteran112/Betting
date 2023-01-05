import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import { PrimaryLoadingButton } from 'components/StyledButton'
import { Link, useParams } from 'react-router-dom'
import { getAPIService } from 'services/apiServices'
import CONSTANTS from 'services/CONSTANTS'
import alert from 'utils/alert'

const PASSWORD_NOT_MATCH = 'Password do not match!'

const ResetPasswordView = () => {
  const params = useParams()
  const [password, setPassword] = useState({
    newPassword: '',
    confirmPassword: ''
  })
  const [error, setError] = useState({
    type: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false)
  const handleChangePassword = async () => {
    if (password.newPassword.length < 9) {
      return alert(false, 'Please input at least 9 letters!')
    }
    if (password.newPassword !== password.confirmPassword) {
      return alert(false, PASSWORD_NOT_MATCH)
    }
    setIsLoading(true)
    try {
      await getAPIService(CONSTANTS.RESET_PASSWORD, {
        resetPasswordToken: params.resetPasswordToken,
        newPassword: password.confirmPassword
      })
      setIsPasswordUpdated(true)
    } catch (error) {
      alert(false, error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (password.newPassword !== password.confirmPassword) {
      return setError({
        type: 'MISMATCH',
        message: PASSWORD_NOT_MATCH
      })
    }
    setError({
      type: '',
      message: ''
    })
  }, [password.confirmPassword])

  const passwordFieldScreen = () => {
    return (
      <>
        <h2 className="welcome pt-3 pb-4 shade-blue">Set your new password</h2>
        <div className="login-form input-type">
          <form
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleChangePassword()
              }
            }}
          >
            <TextField
              label="New Password"
              type="password"
              variant="standard"
              className="w-100 mb-4"
              value={password.newPassword}
              error={false}
              onChange={(e) =>
                setPassword({
                  ...password,
                  newPassword: e.target.value
                })
              }
            />
            <TextField
              label="Confirm Password"
              type="password"
              variant="standard"
              className="w-100 mb-4"
              value={password.confirmPassword}
              error={error.type !== ''}
              helperText={error.type === 'MISMATCH' ? error.message : ''}
              onChange={(e) =>
                setPassword({
                  ...password,
                  confirmPassword: e.target.value
                })
              }
            />
            <PrimaryLoadingButton
              label="Change Password"
              className="w-100"
              loading={isLoading}
              onClick={handleChangePassword}
              disabled={isLoading}
            />
          </form>
        </div>
      </>
    )
  }

  // eslint-disable-next-line no-unused-vars
  const updatedPasswordScreen = () => {
    return (
      <>
        <h2 className="welcome pt-3 pb-4 shade-blue">Password Updated</h2>
        <div className="login-form input-type">
          <div className="alert alert-success">
            Your Password has been updated.
            <br /> Please navigate to the login page.
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="login-container row pt-4 pb-4 m-0">
      <div className="col-12 col-md-6">
        <div className="d-flex  justify-content-center mt-3 mt-md-5">
          <div className="login-box mx-4 p-4 radius text-center">
            {isPasswordUpdated
              ? updatedPasswordScreen()
              : passwordFieldScreen()}
            <div className="mt-3">
              <Link to="/login" className="small text-secondary">
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordView
