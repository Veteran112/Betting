import React, { useEffect } from 'react'
import LoginView from './LoginView'

import './index.scss'

export function LoginContainer() {
  useEffect(() => {
    document.title = 'Login'
  }, [])

  return (
    <div>
      <LoginView title="login" />
    </div>
  )
}
