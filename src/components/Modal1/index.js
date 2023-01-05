import React from 'react'
import PropTypes from 'prop-types'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { CircularProgress } from '@mui/material'

import { PrimaryLoadingButton, SecondaryButton } from 'components/StyledButton'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'

import './index.scss'

export default function Modal1(props) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <Dialog
      fullScreen={fullScreen}
      open={props.open}
      onClose={props.close}
      aria-labelledby="responsive-dialog-title"
      className="w-fit"
    >
      <DialogTitle
        id="responsive-dialog-title"
        sx={{ textAlign: 'center', position: 'relative' }}
      >
        <div className="font-weight-bold border-bottom text-left mb-1">
          {props.title}
          {props.initialize && (
            <span className="ml-3">
              <CircularProgress size={24} color="inherit" />
            </span>
          )}
        </div>
      </DialogTitle>
      <DialogContent
        sx={{ minWidth: '300px' }}
        style={{ minWidth: props.minWidth ? props.minWidth : '400px' }}
      >
        {props.children}
      </DialogContent>
      <DialogActions className="d-flex mb-3 justify-content-end mr-3">
        {props.confirmText !== 'None' && (
          <PrimaryLoadingButton
            label={props.confirmText ? props.confirmText : 'Confirm'}
            onClick={props.confirm}
            loading={props.loading}
          />
        )}
        <SecondaryButton onClick={props.close}>
          {props.closeText ? props.closeText : 'Close'}
        </SecondaryButton>
      </DialogActions>
    </Dialog>
  )
}

Modal1.propTypes = {
  close: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  initialize: PropTypes.bool,
  confirmText: PropTypes.string,
  closeText: PropTypes.string,
  minWidth: PropTypes.string
}
