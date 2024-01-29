import React from 'react'
import '../page.css'
import UserActionSection from './UserActionSection'
import MainHostViedo from './MainHostViedo'
import * as StompJs  from "@stomp/stompjs"

type Props = {
  client : StompJs.Client
  roomId : string
  userId : string
  role : string
}

export default function GuestMainSection(Props : Props) {

  // if (Props.client == {}){
  //   console.log(Props.client)
  //   Props.client.publish(
  //     {
  //       destination : `/pub/room/${Props.roomId}`,
  //       body : JSON.stringify({
  //           id : 1,
  //           roleId : 1  
  //       })
  //   }
  //   )
  // }

  return (
    <div className='bottomcontainer bg-white '>
        <div className='grid grid-cols-2 gap-[1rem]'>
              <MainHostViedo />
              <UserActionSection 
                client = {Props.client}
                roomId = {Props.roomId}
                userId = {Props.userId}
                role = {Props.role}
               />
        </div>
    </div>

  )
}
