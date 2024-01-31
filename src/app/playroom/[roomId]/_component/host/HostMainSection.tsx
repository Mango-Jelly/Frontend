import React from 'react'
import '../page.css'
import PlayInfoSelectSection from './leftbox/PlayInfoSelectSection'
import MainVideoSection from './middlebox/MainVideoSection'
import GuestStateSection from './rightbox/GuestStateSection'

type UserStatus = {
  name: string
  status: number
}

type Props = {
  ENTRY: UserStatus[]
  roomId: string
  streamManager: any
  client: any
}

export default function HostMainSection(Props : Props) {
  return (
    <div className='bottomcontainer'>
        <div className='grid grid-cols-5'>
            <PlayInfoSelectSection
            ENTRY = {Props.ENTRY}
            client = {Props.client}
            roomId = {Props.roomId}
            />
            <MainVideoSection
              client = {Props.client}
              roomId = {Props.roomId}
              streamManager = {Props.streamManager} />
            <GuestStateSection
              ENTRY = {Props.ENTRY}
            />
        </div>
    </div>
  )
}
