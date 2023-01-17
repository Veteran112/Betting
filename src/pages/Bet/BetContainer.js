import { useEffect } from 'react'
import BetView from './BetView'
import './styles.scss'
import Sidebar from '../../components/Sidebar'

export const BetContainer = () => {
  useEffect(() => {
    document.title = ''
  }, [])

  return (
    <div>
      <BetView />
      <Sidebar />
    </div>
  )
}
