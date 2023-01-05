import React, { useEffect } from 'react'
import RegisterView from './RegisterView'

import './index.scss'

export function RegisterContainer() {
  useEffect(() => {
    document.title = 'Register'
  }, [])

  return (
    <div>
      <RegisterView title="register" />
    </div>
  )
}
