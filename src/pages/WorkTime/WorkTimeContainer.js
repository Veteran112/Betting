import React, { useEffect } from 'react'
import WorkTimeView from './WorkTimeView'

import './index.scss'

export function WorkTimeContainer() {
  useEffect(() => {
    document.title = 'Work Time'
  }, [])

  return (
    <div>
      <WorkTimeView title="Work Time" />
    </div>
  )
}
