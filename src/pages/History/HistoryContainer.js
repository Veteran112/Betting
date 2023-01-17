import { useEffect } from 'react'
import HistoryView from './HistoryView'
import './styles.scss'

export const HistoryContainer = () => {
  useEffect(() => {
    document.title = 'History'
  }, [])

  return (
    <div>
      <HistoryView />
    </div>
  )
}
