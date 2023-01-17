import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import { Link } from 'react-router-dom'
import { PrimaryLoadingButton } from 'components/StyledButton'
import { useAuth } from 'contexts'
import { useNavigate } from 'react-router'

const RegisterView = () => {
  const [data, setData] = useState({
    email: '',
    fname: '',
    lname: '',
    password: '',
    confirmPassword: ''
  })

  const auth = useAuth()
  const history = useNavigate()

  const register = async () => {
    console.log('registering')
    const res = await auth.register(data)
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
                />
                {/* <FormControl variant="standard" className="w-100 mb-4">
                  <InputLabel>Location</InputLabel>
                  <Select
                    value={data.location}
                    onChange={(e) =>
                      setData({ ...data, location: e.target.value })
                    }
                    label="Location"
                    sx={{ textAlign: 'left' }}
                  >
                    {countrys.map((item) => (
                      <MenuItem value={item.value} key={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl> */}
                {/* <ReactPhoneInput
                  inputClass="border-none p-0"
                  placeholder="Phone Number"
                  value={data.phone}
                  onChange={(e) => {
                    setData({ ...data, phone: e })
                  }}
                  component={Input}
                /> */}
                {/* <FormControl variant="standard">
                  <RadioGroup
                    row
                    aria-labelledby="row-controlled-radio-buttons-group"
                    variant="standard"
                    value={data.userType}
                    onChange={(e) =>
                      setData({ ...data, userType: e.target.value })
                    }
                  >
                    <FormControlLabel
                      value="interpreter"
                      control={<Radio />}
                      label="interpreter"
                    />
                    <FormControlLabel
                      value="client"
                      control={<Radio />}
                      label="client"
                    />
                  </RadioGroup>
                </FormControl> */}
                {/* {data.userType === 'client' && (
                  <TextField
                    label="Company"
                    type="text"
                    variant="standard"
                    className="w-100 mb-4"
                    value={data.company}
                    onChange={(e) =>
                      setData({ ...data, company: e.target.value })
                    }
                  />
                )} */}
                {/* {data.userType === 'interpreter' && (
                  <>
                    <TextField
                      label="Language"
                      type="text"
                      variant="standard"
                      className="w-100 mb-4"
                      value={data.language}
                      onChange={(e) =>
                        setData({ ...data, language: e.target.value })
                      }
                    />
                    <FormControl variant="standard" className="w-100 mb-4">
                      <InputLabel>Experience</InputLabel>
                      <Select
                        value={data.experience}
                        onChange={(e) =>
                          setData({ ...data, experience: e.target.value })
                        }
                        label="Experience"
                        sx={{ textAlign: 'left' }}
                      >
                        <MenuItem value={1}>1 year</MenuItem>
                        <MenuItem value={2}>2 years</MenuItem>
                        <MenuItem value={3}>3 years</MenuItem>
                        <MenuItem value={4}>4 years</MenuItem>
                        <MenuItem value={5}>5 years</MenuItem>
                        <MenuItem value={6}>Over 5 years</MenuItem>
                      </Select>
                    </FormControl>
                  </>
                )} */}
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
                {auth.error && (
                  <InputLabel sx={{ color: 'red' }}>
                    {auth.error.message}
                  </InputLabel>
                )}
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
