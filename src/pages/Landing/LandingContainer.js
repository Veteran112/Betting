import React, { useEffect } from 'react'
import LandingView from './LandingView'

import './index.scss'

export function LandingContainer() {
  useEffect(() => {
    document.title = 'Welcome'
  }, [])

  return (
    <div>
      <LandingView title="welcome" />
    </div>
  )
}
