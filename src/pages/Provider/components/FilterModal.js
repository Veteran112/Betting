import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, Typography, Box, Grid } from '@mui/material'
import { PrimaryLoadingButton, SecondaryButton } from 'components/StyledButton'
import { TextField1 } from 'components/TextField1'

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
    secondaryActionName
  } = props

  const [filterData, setFilterData] = useState({})

  useEffect(() => {
    setFilterData(data)
  }, [data])

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h5" component="h5" className="onyx main-font">
          {title}
        </Typography>
        <Grid container spacing={{ xs: 2, md: 2 }} className="mt-1">
          {Object.keys(sourceFields).map((key) => {
            return (
              <Grid item xs={12} sm={6} md={6} key={key}>
                <TextField1
                  id={key}
                  kind={sourceFields[key].kind}
                  label={sourceFields[key].label}
                  data={sourceFields[key].data}
                  type={sourceFields[key].kind}
                  value={filterData[key]}
                  onChange={(e) => {
                    setFilterData({
                      ...filterData,
                      [key]: e.target.value
                    })
                  }}
                  startAdornment={<></>}
                />
              </Grid>
            )
          })}
        </Grid>
        <div className="d-flex justify-content-end mt-3 gap-1">
          <PrimaryLoadingButton
            label={primaryActionName}
            loading={isLoading}
            onClick={() => {
              onPrimaryClick(filterData)
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
  secondaryActionName: PropTypes.string
}

export default UserModal
