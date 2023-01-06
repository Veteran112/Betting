import { useEffect } from 'react'
import BettingProviderView from './BettingProviderView'
import './styles.scss'

export const BettingProviderContainer = () => {
  useEffect(() => {
    document.title = 'Betting Provider'
  }, [])

  return (
    <div>
      <BettingProviderView />
    </div>
  )
}
