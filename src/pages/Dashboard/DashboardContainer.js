import { useEffect } from 'react'
import DashboardView from './DashboardView'
import './styles.scss'
import Sidebar from '../../components/Sidebar'

export const DashboardContainer = () => {
  useEffect(() => {
    document.title = 'Dashboard'
  }, [])

  return (
    <div>
      <DashboardView />
      <Sidebar />
    </div>
  )
}
