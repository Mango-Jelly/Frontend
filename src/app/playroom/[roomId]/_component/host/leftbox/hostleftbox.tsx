import React from 'react'
import HostleftBottomcomponent from './HostleftBottomcomponent'
import HostleftTopcomponent from './HostleftTopcomponent'


type UserStatus = {
  name : string
  status : number
} 
type Props = {
  ENTRY : UserStatus[]
  client : any
  roomId : string
}


export default function hostleftbox(Props : Props) {
  return (
    <div className='h-[55rem] my-auto'>
        <HostleftTopcomponent 
          ENTRY = {Props.ENTRY}
          client = {Props.client}
          roomId = {Props.roomId}
        />

        <HostleftBottomcomponent />
    </div>
  )
}