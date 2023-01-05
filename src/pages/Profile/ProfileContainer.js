import React, { useEffect } from 'react'
import ProfileView from './ProfileView'

import './index.scss'

export function ProfileContainer() {
  useEffect(() => {
    document.title = 'Profile'
  }, [])

  return (
    <div>
      <ProfileView title="Profile" />
    </div>
  )
}
