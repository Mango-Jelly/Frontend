import React from 'react'
import RolesSelection from './RolesSelection'
import ScriptSelection from './ScriptSelection'


type UserStatus = {
  name: string
  status: number
}
type Props = {
  ENTRY: UserStatus[]
  client: any
  roomId: string
}


export default function PlayInfoSelectSection(Props : Props) {
  return (
    <div className='h-[55rem] my-auto'>
        <ScriptSelection 
          ENTRY = {Props.ENTRY}
          client = {Props.client}
          roomId = {Props.roomId}
        />

        <RolesSelection />
    </div>
  )
}