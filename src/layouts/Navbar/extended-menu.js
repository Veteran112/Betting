import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'
import './styles.scss'
import { useAuth } from 'contexts'
import { useNavigate } from 'react-router'

const ExtendedMenu = () => {
  const [showMenu, setShowMenu] = useState(false)
  const auth = useAuth()
  const navigate = useNavigate()

  return (
    <div
      className={`extended-menu ${showMenu ? 'expanded' : ''}`}
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
      onClick={() => setShowMenu(true)}
    >
      <MenuIcon className="extended-menu-icon" sx={{ fontSize: 40 }} />
      {showMenu && (
        <div className="menu-panel">
          <ul>
            <li
              onClick={() => {
                navigate('/betting_provider')
              }}
            >
              Provider
            </li>
          </ul>
          <ul className="mt-2">
            <li
              onClick={() => {
                navigate('/bet')
              }}
            >
              Bet
            </li>
          </ul>
          <ul className="mt-2">
            <li
              onClick={() => {
                navigate('/history')
              }}
            >
              History
            </li>
          </ul>

          <ul className="mt-2">
            <li
              onClick={() => {
                navigate('/manage_users/' + auth.profile._id)
              }}
            >
              Manage Accounts
            </li>
          </ul>
          <div className="menu-divider" />
          <ul>
            <li
              onClick={() => {
                auth.logout()
              }}
            >
              Sign Out
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default ExtendedMenu
