import { useEffect } from 'react'
import BettingProviderView from './BettingProviderView'
import './styles.scss'

export const BettingProviderContainer = () => {
  useEffect(() => {
    document.title = 'Manage Accounts'
  }, [])

  return (
    <div>
      <BettingProviderView />
    </div>
  )
}
