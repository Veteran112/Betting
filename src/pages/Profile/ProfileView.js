import { useState, useMemo, useEffect } from 'react'
import { Typography } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import {
  PrimaryPhoneField,
  PrimarySelect,
  PrimaryTextField
  // PrimaryPhoneField
} from 'components/StyledTextFields'
import { PrimaryLoadingButton } from 'components/StyledButton'
import ReactPhoneInput from 'react-phone-input-mui'
import { useAuth } from 'contexts'
import { getAPIService } from 'services/apiServices'
import APIConstants from 'services/CONSTANTS'
import Swal from 'sweetalert2'
// import WorkTimeModal from './components/WorkTimeModal'
import countryList from 'react-select-country-list'
import { useNavigate } from 'react-router'
import CONSTANTS from 'services/CONSTANTS'

const ProfileView = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [data, setData] = useState(auth.profile)
  // const [modal, setModal] = useState('')
  const [saveAvailable, setSaveAvailable] = useState(false)
  const [loading, setLoading] = useState('')
  const countrys = useMemo(() => countryList().getData(), [])
  const [passwords, setPasswords] = useState({
    new: '',
    confirm: '',
    newErr: '',
    confirmErr: ''
  })
  // const experiences = [
  //   { value: '1', label: '1 year' },
  //   { value: '2', label: '2 years' },
  //   { value: '3', label: '3 years' },
  //   { value: '4', label: '4 years' },
  //   { value: '5', label: '5 years' },
  //   { value: '6', label: 'Over 5 years' }
  // ]

  // const availabilities = [
  //   { value: '0', label: 'Available' },
  //   { value: '1', label: 'Unavailable' },
  //   { value: '2', label: 'Scheduled' }
  // ]

  const handleUpdate = () => {
    setLoading('UpdatingUser')
    const userData = { ...data }
    delete userData['uid']
    getAPIService(
      APIConstants.UPDATE_USER,
      {
        editUserId: data.uid,
        userData: { ...userData }
      },
      'PUT'
    )
      .then(() => {
        auth.setProfile(data)
        Swal.fire({
          icon: 'success',
          text: 'User Updated',
          showConfirmButton: false,
          timer: 1500
        })
        setLoading('')
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err
        })
        setLoading('')
      })
  }

  const handlePasswordUpdate = () => {
    let passed = false
    if (passwords.new === '') {
      setPasswords((_prev) => ({ ..._prev, newErr: 'Password Required!' }))
      passed = true
    }
    if (passwords.confirm === '') {
      setPasswords((_prev) => ({
        ..._prev,
        confirmErr: 'Confirm Password Required!'
      }))
      passed = true
    }

    if (passwords.new !== passwords.confirm) {
      setPasswords((_prev) => ({
        ..._prev,
        confirmErr: 'Confirm Password does not match!'
      }))
      passed = true
    }
    if (!passed) {
      setLoading('ChangingPassword')
      getAPIService(
        APIConstants.CHANGE_USER_PASSWORD,
        {
          editUserId: auth.profile.uid,
          newPassword: passwords.new,
          confirmPassword: passwords.confirm
        },
        'PATCH'
      )
        .then(() => {
          setPasswords({
            new: '',
            newErr: '',
            confirm: '',
            confirmErr: ''
          })
          Swal.fire({
            icon: 'success',
            text: 'Password Changed',
            showConfirmButton: false,
            timer: 1500
          })
          setLoading('')
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err
          })
          setLoading('')
        })
    }
  }

  const setProfileData = (e, key) => {
    if (data[key] !== e) {
      setSaveAvailable(true)
      setData({ ...data, [key]: e })
    }
  }

  // const viewWorkTime = () => {
  //   setModal('worktime')
  // }

  useEffect(async () => {
    const emailVerifyToken = searchParams.get('emailVerifyToken')
    if (emailVerifyToken) {
      try {
        await getAPIService(CONSTANTS.VERIFY_EMAIL, {
          emailVerifyToken
        })
        auth.setProfile({ ...auth.profile, emailVerified: true })
      } catch (error) {
        console.log(error)
      }
      navigate('/profile')
    }
  }, [])

  return (
    <div className="profile-container">
      <div className="profile-box container">
        <div className="profile-content">
          <div className="d-flex justify-content-between">
            <Typography variant="h5" component="h5" className="onyx main-font">
              <span className="mr-2">Users</span>
              {/* {auth.profile.userType === '' && (
              <i
                className="fa fa-clock text-primary cursor-pointer"
                onClick={viewWorkTime}
              />
            )} */}
            </Typography>
            <div className="d-flex justify-content-center">
              <PrimaryLoadingButton
                disabled={!saveAvailable}
                label="Save"
                loading={loading === 'UpdatingUser'}
                onClick={handleUpdate}
              />
            </div>
          </div>
          <div className="w-100 mt-4">
            <div className="row">
              <div className="col-md-4 col-xs-12 col-sm-6 mb-3">
                <PrimaryTextField
                  id="firstName"
                  label="First Name"
                  size="small"
                  // value={data.firstName}
                  onChange={(e) => setProfileData(e.target.value, 'firstName')}
                />
              </div>
              <div className="col-md-4 col-xs-12 col-sm-6 mb-3">
                <PrimaryTextField
                  id="lastName"
                  label="Last Name"
                  size="small"
                  // value={data.lastName}
                  onChange={(e) => setProfileData(e.target.value, 'lastName')}
                />
              </div>
              <div className="col-md-4 col-xs-12 col-sm-6 mb-3">
                <ReactPhoneInput
                  inputClass="phone_field"
                  component={PrimaryPhoneField}
                  // value={data.phone}
                  onChange={(e) => setProfileData(e, 'phone')}
                />
              </div>
              {/* {data.userType === '' && (
              <>
                <div className="col-md-4 col-xs-12 col-sm-6 mb-3">
                  <PrimaryTextField
                    id="language"
                    label="Language"
                    size="small"
                    // value={data.language}
                    onChange={(e) => setProfileData(e.target.value, 'language')}
                  />
                </div>
                <div className="col-md-4 col-xs-12 col-sm-6 mb-3">
                  <PrimarySelect
                    id="experience"
                    label="Experience"
                    size="small"
                    // value={data.experience}
                    onChange={(e) =>
                      setProfileData(e.target.value, 'experience')
                    }
                    data={experiences}
                  />
                </div>
                <div className="col-md-4 col-xs-12 col-sm-6 mb-3">
                  <PrimarySelect
                    id="availability"
                    label="Availability"
                    size="small"
                    // value={data.availability}
                    onChange={(e) =>
                      setProfileData(e.target.value, 'availability')
                    }
                    data={availabilities}
                  />
                </div>
              </>
            )} */}
              {/* {data.userType === '' && (
              <div className="col-md-4 col-xs-12 col-sm-6 mb-3">
                <PrimaryTextField
                  id="company"
                  label="company"
                  size="small"
                  // value={data.company}
                  onChange={(e) => setProfileData(e.target.value, 'company')}
                />
              </div>
            )} */}
              <div className="col-md-4 col-xs-12 col-sm-6 mb-3">
                <PrimarySelect
                  id="location"
                  label="Location"
                  // value={data.location}
                  data={countrys}
                  onChange={(e) => setProfileData(e.target.value, 'location')}
                  size="small"
                />
              </div>
            </div>
            <div className="divider mb-3"></div>
            <div className="row">
              <div className="col-md-4 col-xs-12 col-sm-6 mb-3">
                <PrimaryTextField
                  id="newPassword"
                  label="New Password"
                  size="small"
                  type="password"
                  value={passwords.new}
                  error={passwords.newErr !== ''}
                  helperText={passwords.newErr}
                  onChange={(e) =>
                    setPasswords({ ...passwords, new: e.target.value })
                  }
                />
              </div>
              <div className="col-md-4 col-xs-12 col-sm-6 mb-3">
                <PrimaryTextField
                  id="confirmPassword"
                  label="Confirm Password"
                  size="small"
                  type="password"
                  value={passwords.confirm}
                  error={passwords.confirmErr !== ''}
                  helperText={passwords.confirmErr}
                  onChange={(e) =>
                    setPasswords({ ...passwords, confirm: e.target.value })
                  }
                />
              </div>
              <div className="col-md-4 col-xs-12 col-sm-6 mb-3">
                <PrimaryLoadingButton
                  label="Update Password"
                  loading={loading === 'ChangingPassword'}
                  onClick={handlePasswordUpdate}
                />
              </div>
            </div>
          </div>
          {/* <WorkTimeModal
          open={modal === 'worktime'}
          onClose={() => setModal('')}
        /> */}
        </div>
      </div>
    </div>
  )
}

export default ProfileView
