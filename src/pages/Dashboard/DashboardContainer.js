import { useState, useEffect } from 'react'
import DashboardView from './DashboardView'
import './styles.scss'
import Sidebar from '../../components/Sidebar'

export const DashboardContainer = () => {
  useEffect(() => {
    document.title = 'Dashboard'
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
        <DashboardView />
      </div>
      <Sidebar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />
    </div>
  )
}
