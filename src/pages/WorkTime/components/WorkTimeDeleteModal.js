import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Typography, Box, Grid } from '@mui/material'
import { PrimaryLoadingButton, SecondaryButton } from 'components/StyledButton'

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

const WorkTimeModal = (props) => {
  const {
    open,
    onClose,
    isLoading,
    onPrimaryClick,
    onSecondaryClick,
    primaryActionName,
    secondaryActionName
  } = props

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h5" component="h5" className="onyx main-font">
          {`Are you sure? You won't be able to revert this!`}
        </Typography>
        <Grid container spacing={{ xs: 2, md: 2 }} className="mt-1"></Grid>
        <div className="d-flex justify-content-end mt-3 gap-1">
          <PrimaryLoadingButton
            label={primaryActionName}
            loading={isLoading}
            onClick={onPrimaryClick}
          />
          <SecondaryButton onClick={onSecondaryClick}>
            {secondaryActionName}
          </SecondaryButton>
        </div>
      </Box>
    </Modal>
  )
}

WorkTimeModal.propTypes = {
  open: PropTypes.any,
  onClose: PropTypes.any,
  title: PropTypes.string,
  isLoading: PropTypes.bool,
  onPrimaryClick: PropTypes.any,
  onSecondaryClick: PropTypes.any,
  primaryActionName: PropTypes.string,
  secondaryActionName: PropTypes.string,
  errors: PropTypes.object,
  helperTexts: PropTypes.object
}

export default WorkTimeModal
