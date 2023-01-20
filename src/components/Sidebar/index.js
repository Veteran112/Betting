import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Typography, Grid } from '@mui/material'
import PropTypes from 'prop-types'

const drawerWidth = 240

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  background: 'transparent',
  maxWidth: '320px',
  left: 0,
  right: 'auto',
  boxShadow: 'none',
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}))

const Sidebar = (props) => {
  const theme = useTheme()

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={props.open}>
        <Toolbar>
          <IconButton
            color="black"
            aria-label="open drawer"
            onClick={props.handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, mt: 3, ...(props.open && { display: 'none' }) }}
          >
            <ChevronRightIcon />
          </IconButton>
          <Typography className="text-black mt-4">
            $3880 available balances
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
        variant="persistent"
        anchor="left"
        open={props.open}
      >
        <DrawerHeader>
          <IconButton onClick={props.handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box className="p-2">
          <b className="my-4 d-block">AVAILABLE BALANCES</b>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography>Bet123</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>$1900</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography>Bet932</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>$1900</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="mt-3">
            <Grid item xs={6}>
              TOTAL
            </Grid>
            <Grid item xs={6}>
              $3800
            </Grid>
          </Grid>
        </Box>
      </Drawer>
    </Box>
  )
}

Sidebar.propTypes = {
  open: PropTypes.bool,
  handleDrawerOpen: PropTypes.func,
  handleDrawerClose: PropTypes.func
}

export default Sidebar
