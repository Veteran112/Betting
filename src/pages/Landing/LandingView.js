import { useState, useEffect } from 'react'
import {
  Grid,
  Typography,
  Box,
  AppBar,
  Container,
  Toolbar,
  Link,
  Menu,
  MenuItem,
  IconButton
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import MenuIcon from '@mui/icons-material/Menu'
import { useAuth } from 'contexts'
import { useNavigate } from 'react-router-dom'
// import logo_ from 'assets/images/logo_.png'

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  toolbar: {
    minHeight: '72px !important',
    backgroundColor: '#00000000'
  },
  menuItem: {
    fontSize: '17px',
    marginLeft: '30px',
    fontWeight: '700',
    fontFamily: 'WorkSans',
    textTransform: 'none',
    color: '#4D5154'
  }
})

const LandingView = () => {
  const auth = useAuth()
  const [anchorElNav, setAnchorElNav] = useState(null)
  // const [anchorElUser, setAnchorElUser] = React.useState(null)
  const styles = useStyles()
  const navigate = useNavigate()
  // const location = useLocation()

  console.log(auth, 'header')
  useEffect(() => {
    console.log(auth, 'header')
  }, [])

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <Box>
      <AppBar position="static" color="inherit">
        <Container maxWidth="xl" sx={{ background: '#000000' }}>
          <Toolbar disableGutters className={styles.toolbar}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'flex', md: 'flex' } }}
            >
              {/* <Link className="navbar-brand" underline="none" href="/">
                <div className="img-fluid d-flex">
                  <img className="logo-large-img" src={logo_} alt="logo_img" />
                </div>
              </Link> */}
            </Typography>
            <Box sx={{ ml: 'auto', display: { xs: 'none', md: 'flex' } }}>
              {auth.isAuthenticated ? (
                <>
                  <Link
                    sx={{
                      color: '#ccc !important',
                      cursor: 'pointer',
                      marginRight: '20px'
                    }}
                    href="/betting_provider"
                  >
                    {' '}
                    Provider{' '}
                  </Link>
                  <Link
                    sx={{
                      color: '#ccc !important',
                      cursor: 'pointer',
                      marginRight: '20px'
                    }}
                    href="/history"
                  >
                    {' '}
                    History{' '}
                  </Link>
                  {auth.profile && auth.profile.userType === 'admin' && (
                    <Link
                      sx={{
                        color: '#ccc !important',
                        cursor: 'pointer',
                        marginRight: '20px'
                      }}
                      href="/manage_users"
                    >
                      {' '}
                      Manage Accounts{' '}
                    </Link>
                  )}
                  <Link
                    sx={{ color: '#ccc !important', cursor: 'pointer' }}
                    href="/logout"
                    onClick={() => {
                      auth.logout()
                    }}
                  >
                    {' '}
                    Logout{' '}
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    sx={{
                      color: '#ccc !important',
                      cursor: 'pointer',
                      marginRight: '20px'
                    }}
                    href="/login"
                  >
                    {' '}
                    Sign In{' '}
                  </Link>
                  <Link
                    sx={{ color: '#ccc !important', cursor: 'pointer' }}
                    href="/register"
                  >
                    {' '}
                    Sign Up{' '}
                  </Link>
                </>
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
                <div>
                  {!auth.isAuthenticated && (
                    <div>
                      <MenuItem
                        onClick={() => {
                          handleCloseNavMenu()
                          navigate('/login')
                        }}
                      >
                        <Typography>Sign In</Typography>
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleCloseNavMenu()
                          navigate('/register')
                        }}
                      >
                        <Typography>Sign Up</Typography>
                      </MenuItem>
                    </div>
                  )}
                  {auth.isAuthenticated && (
                    <>
                      <MenuItem
                        onClick={() => {
                          navigate('/provider')
                        }}
                      >
                        <Typography>Provider</Typography>
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          navigate('/history')
                        }}
                      >
                        <Typography>History</Typography>
                      </MenuItem>
                    </>
                  )}
                  {auth.isAuthenticated &&
                    auth.profile &&
                    auth.profile.userType === 'admin' && (
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
                </div>
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
      <Box
        sx={{ flexGrow: 1, overflowX: 'hidden' }}
        className="landingpage-container"
      >
        <Box
          style={{ background: 'white', padding: '20px', minHeight: '100vh' }}
        >
          <Box sx={{ flexGrow: 1, overflowX: 'hidden' }}>
            <Grid container>
              <Grid item xs={12} sm={12} md={12}>
                <img src="1.png" alt="" className="logo_" />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <img src="footer.png" alt="" className="logo_" />
              </Grid>
              {/* <Grid item xs={12} sm={7} md={7}>
                <Typography
                  color="white"
                  fontSize="30px"
                  marginLeft="30px"
                  marginTop="50px"
                  fontStyle="bold"
                >
                  Neon-Languages LLC
                </Typography>
                <Typography
                  fontSize="18px"
                  marginTop="10px"
                  marginLeft="30px"
                  color="white"
                >
                  <br />A company built based on the needs of the costumer.
                  Neon-L brings a new era, a place of innovative experience,
                  with the ability to make choices that matter. With the
                  efficiency and the collaboration of our team you have the
                  ability to create a fast paced telephonic interpretation
                  session for you. Our company has worked hard to create a
                  conclusive system that gives the right to our costumers to
                  become our clients or use our services without commitment. We
                  serve clients and guests similarly, with the need to create a
                  faster and more advanced system of communication. Neon-L was
                  founded in Connecticut, USA, and its looking to rise above the
                  limitations of other traditional language service companies,
                  giving the flexibility to place an OPI call on your own time
                  and based on your needs.
                </Typography>
              </Grid> */}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

LandingView.propTypes = {}

export default LandingView
