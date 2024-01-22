import React from 'react'
import HostleftBottomcomponent from './HostleftBottomcomponent'
import HostleftTopcomponent from './HostleftTopcomponent'

export default function hostleftbox() {
  return (
    <div className='h-[55rem] my-auto'>
        <HostleftTopcomponent />
        <HostleftBottomcomponent />
    </div>
  )
}
