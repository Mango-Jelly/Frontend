import React from 'react'
import HostleftBottomcomponent from './hostleftBottomcomponent'
import HostleftTopcomponent from './hostleftTopcomponent'

export default function hostleftbox() {
  return (
    <div className='h-[55rem] my-auto'>
        <HostleftTopcomponent />
        <HostleftBottomcomponent />
    </div>
  )
}
