import { useEffect } from 'react'
import ManageAccountsView from './ManageAccountsView'
import './styles.scss'

export const ManageAccountsContainer = () => {
  useEffect(() => {
    document.title = 'Manage Accounts'
  }, [])

  return (
    <div>
      <ManageAccountsView />
    </div>
  )
}
