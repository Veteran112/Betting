import React, { useEffect } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  MenuItem
} from '@mui/material'
// import logoImg from 'assets/images/logo.png'
import { makeStyles } from '@mui/styles'
import { MenuButton } from 'components/StyledButton'
import Link from '@mui/material/Link'
import { useNavigate, useLocation } from 'react-router'
import { toneWhite } from 'config/Color'
import { useAuth } from 'contexts'
import ExtendedMenu from './extended-menu'

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Profile', path: '/profile' }
]

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
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  // const [anchorElUser, setAnchorElUser] = React.useState(null)
  const styles = useStyles()
  const navigate = useNavigate()
  const location = useLocation()
  const auth = useAuth()

  console.log(auth, 'header')
  useEffect(() => {
    console.log(auth, 'header')
  }, [])

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget)
  // }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <AppBar position="static" color="inherit">
      <Container maxWidth="xl">
        <Toolbar disableGutters className={styles.toolbar}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'flex', md: 'flex' } }}
          >
            {/* <Link className="navbar-brand" underline="none" href="/">
              <div className="img-fluid logo-img d-flex">
                <img className="logo-small-img" src={logoImg} alt="logo_img" />
              </div>
            </Link> */}
          </Typography>
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
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={() => {
                    handleCloseNavMenu()
                    navigate(page.path)
                  }}
                >
                  <Typography>{page.name}</Typography>
                </MenuItem>
              ))}
              {auth.isAuthenticated && auth.profile.userType === 'admin' && (
                <MenuItem
                  onClick={() => {
                    navigate('/manage_users')
                  }}
                >
                  <Typography>Manage accounts</Typography>
                </MenuItem>
              )}
              {auth.isAuthenticated && (
                <MenuItem
                  onClick={() => {
                    auth.logout()
                    handleCloseNavMenu()
                  }}
                >
                  <Typography>Logout</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="medium"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Navbar
