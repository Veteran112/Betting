import React from 'react'
import { Tooltip } from '@mui/material'
import { makeStyles } from '@mui/styles'
const useStylesBootstrap = makeStyles(() => ({
  arrow: {
    color: 'rgba(0,0,0,0.7)'
  },
  tooltip: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    fontSize: '12px'
  }
}))

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap()
  return <Tooltip arrow classes={classes} {...props} placement="top" />
}

export default BootstrapTooltip
