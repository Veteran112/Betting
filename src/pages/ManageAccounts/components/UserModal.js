import React, { useEffect, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Modal, Typography, Box, Grid } from '@mui/material'
import { PrimaryLoadingButton, SecondaryButton } from 'components/StyledButton'
import { TextField1 } from 'components/TextField1'
import countryList from 'react-select-country-list'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #2e2e2e',
  boxShadow: 24,
  p: 2
}

const UserModal = (props) => {
  const {
    open,
    onClose,
    title,
    isLoading,
    onPrimaryClick,
    onSecondaryClick,
    data,
    sourceFields,
    primaryActionName,
    secondaryActionName,
    errors,
    helperTexts,
    onFieldInteract
  } = props

  const [userData, setUserData] = useState({})
  const countrys = useMemo(() => countryList().getData(), [])

  useEffect(() => {
    setUserData(data)
  }, [data])

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h5" component="h5" className="onyx main-font">
          {title}
        </Typography>
        <Grid container spacing={{ xs: 2, md: 2 }} className="mt-1">
          {Object.keys(sourceFields).map((key) => {
            if (
              (key === 'company' && userData['userType'] === 'client') ||
              ((key === 'language' ||
                key === 'availability' ||
                key === 'experience') &&
                userData['userType'] === 'interpreter') ||
              (key !== 'company' &&
                key !== 'language' &&
                key !== 'availability' &&
                key !== 'experience')
            ) {
              return (
                <Grid item xs={12} sm={6} md={6} key={key}>
                  <TextField1
                    id={key}
                    kind={sourceFields[key].kind}
                    label={sourceFields[key].label}
                    data={
                      key === 'location' ? countrys : sourceFields[key].data
                    }
                    type={sourceFields[key].kind}
                    value={userData[key]}
                    onChange={(e) => {
                      setUserData({
                        ...userData,
                        [key]: e.target.value
                      })
                      onFieldInteract({
                        fieldName: key,
                        value: e.target.value
                      })
                    }}
                    error={errors[key]}
                    helperText={helperTexts[key]}
                    startAdornment={<></>}
                  />
                </Grid>
              )
            }
          })}
        </Grid>
        <div className="d-flex justify-content-end mt-3 gap-1">
          <PrimaryLoadingButton
            label={primaryActionName}
            loading={isLoading}
            onClick={() => {
              onPrimaryClick(userData)
            }}
          />
          <SecondaryButton onClick={onSecondaryClick}>
            {secondaryActionName}
          </SecondaryButton>
        </div>
      </Box>
    </Modal>
  )
}

UserModal.propTypes = {
  open: PropTypes.any,
  onClose: PropTypes.any,
  title: PropTypes.string,
  isLoading: PropTypes.bool,
  onPrimaryClick: PropTypes.any,
  onSecondaryClick: PropTypes.any,
  sourceFields: PropTypes.any,
  data: PropTypes.any,
  primaryActionName: PropTypes.string,
  secondaryActionName: PropTypes.string,
  errors: PropTypes.object,
  helperTexts: PropTypes.object,
  onFieldInteract: PropTypes.any
}

export default UserModal
