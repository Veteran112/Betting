import { useEffect } from 'react'
import ProviderView from './ProviderView'
import './styles.scss'

export const ProviderContainer = () => {
  useEffect(() => {
    document.title = 'Provider'
  }, [])

  return (
    <div>
      <ProviderView />
    </div>
  )
}
