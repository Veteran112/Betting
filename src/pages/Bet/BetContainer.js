import { useState, useEffect } from 'react'
import BetView from './BetView'
import './styles.scss'
import Sidebar from '../../components/Sidebar'

export const BetContainer = () => {
  useEffect(() => {
    document.title = ''
  }, [])

  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <div onClick={handleDrawerClose}>
        <BetView />
      </div>
      <Sidebar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />
    </div>
  )
}
