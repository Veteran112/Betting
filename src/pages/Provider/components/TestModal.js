import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Box } from '@mui/material'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 300,
  bgcolor: 'background.paper',
  border: '2px solid #2e2e2e',
  boxShadow: 24,
  p: 2,
  display: 'flex',
  justifyContent: 'center'
}

const TestModal = (props) => {
  const { open, onClose } = props

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <iframe
          className="embed-responsive-item"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik"
          allowFullScreen
        ></iframe>
      </Box>
    </Modal>
  )
}

TestModal.propTypes = {
  open: PropTypes.any,
  onClose: PropTypes.any
}

export default TestModal
