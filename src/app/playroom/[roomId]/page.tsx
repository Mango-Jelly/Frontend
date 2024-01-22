'use client';
import style from '@/app/_component/modal.module.css'
import Link from "next/link"
import Top from './_component/Top'
// import { useRouter } from 'next/router'

import BottomHost from './_component/host/Bottomhost';
import BottomGuest from './_component/guest/Bottomguest';
import { useState } from 'react';
import { useRef, useEffect } from "react";
import * as StompJs  from "@stomp/stompjs"

type Props = {
  params : { roomId : string } 
}
 
export default function Page({ params : { roomId } } : Props ) {
  const [isHost, setIsHost] = useState(false)

  const changeHost = () => {
    setIsHost(a => !a)
  }
  const client = useRef<any>({});

  function onMessageReceived (message : StompJs.Message) {
    const messageBody = JSON.parse(message.body);
    console.log(messageBody)

}
  useEffect(() => {
      
      const subscribe = () => {
          client.current.subscribe(`/sub/channel/${roomId}`, onMessageReceived)
          }

          
      function publishOnWait() {
          client.current.publish({
              destination : `/pub/room/${roomId}`,
              body : JSON.stringify({
                  id : 1,
                  roleId : 1  
              })
          })
      }   

      
          // 커넥트 함수 /*
      const connect = () => {

          client.current = new StompJs.Client({
              brokerURL: "ws://localhost:8080/ws",
              onConnect : () => {
                  console.log("connected");
                  subscribe();
                  publishOnWait();
              },
              onDisconnect : () => {
                  console.log("failed to connect");
              }
          })
          client.current.activate()
      
      }
      connect();
  }, [roomId])
  

  return (
    // TODO : 화상 채팅방 구현

    <div className='flex flex-col items-center'>
    <div className=''>
      <Top 
      depart = '꿈나무 유치원'
      title = '망고 연극반'
      />

      <p className='text-center'><button type='button' onClick = {changeHost}  className="text-white bg-blue-700 hover:bg-blue-800 active:bg-blue-800   font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{isHost ? 'Host': 'Guest'}  </button></p>

      <div className='bottomcontainer'>
      {isHost? 
        <BottomHost />
      : null}

      {!isHost?
        <BottomGuest />
      : null

      }
      <Link href={`/scenario/1`}>링크</Link>
      </div>
    </div>
    </div>

  )
}
