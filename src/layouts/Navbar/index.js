import React from 'react'
import { AppBar, Box, Toolbar, Container, MenuItem } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { MenuButton } from 'components/StyledButton'
import Link from '@mui/material/Link'
import { useNavigate, useLocation } from 'react-router'
import { toneWhite } from 'config/Color'
import { useAuth } from 'contexts'
import ExtendedMenu from './extended-menu'

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  toolbar: {
    minHeight: '96px !important'
  },
  menuItem: {
    fontSize: '17px',
    marginLeft: '30px',
    fontWeight: '700',
    fontFamily: 'WorkSans',
    textTransform: 'none',
    color: '#4D5154'
  },
  activeMenu: {
    background: toneWhite + ' !important'
  }
})

const Navbar = () => {
  const styles = useStyles()
  const navigate = useNavigate()
  const location = useLocation()
  const auth = useAuth()

  return (
    <AppBar position="static" color="inherit">
      <Container maxWidth="xl">
        <Toolbar disableGutters className={styles.toolbar}>
          <Box sx={{ ml: 'auto', display: { xs: 'none', md: 'flex' } }}>
            <MenuButton
              onClick={() => {
                navigate('/')
              }}
              sx={{ color: 'black', display: 'block' }}
              className={location.pathname == '/' ? styles.activeMenu : ''}
            >
              <Link color="inherit" underline="none">
                {' '}
                Home{' '}
              </Link>
            </MenuButton>
            {auth.isAuthenticated && (
              <MenuItem
                sx={{
                  background: 'transparent',
                  padding: 0,
                  marginLeft: '2.5em'
                }}
              >
                <ExtendedMenu />
              </MenuItem>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Navbar
