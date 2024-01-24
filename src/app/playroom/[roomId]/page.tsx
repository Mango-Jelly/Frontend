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
import { disconnect } from 'process';

type Props = {
  params : { roomId : string } 
}
 

type StateCode = {
  
}

export default function Page({ params : { roomId } } : Props ) {
  const [isHost, setIsHost] = useState(false)
  const [ENTRY, setENTRY] = useState<string[]>([])

  const USERID = `user${Math.random()}`

  const changeHost = () => {
    setIsHost(a => !a)
  }

  const client = useRef<any>({});

  function onMessageReceived(message : StompJs.Message) {
    try {
      const messageBody = JSON.parse(message.body);
      // console.log((messageBody.code == 100) , isHost)
      if ((messageBody.code == 100)) {
        // console.log(messageBody.id)
        setENTRY(ENTRY => [...ENTRY, messageBody.id])
        
      } else if (messageBody.code == 101){
        // console.log(messageBody.id)
        setENTRY(ENTRY => ENTRY.filter(item => item != messageBody.id))
        console.log(ENTRY)
      } else if (Math.floor(messageBody.code / 200) == 1){

      }


    } catch (error) {
      console.error('Error parsing received message:', error);
    }
  }



  useEffect(() => {
      
      const subscribe = () => {
          client.current.subscribe(`/sub/channel/${roomId}`, onMessageReceived)
        }

      function Join() {
        const message = {
          code: 100,
          id : USERID
        };
        // console.log(JSON.stringify(message))
        client.current.publish({
          destination: `/sub/channel/${roomId}`,
          body: JSON.stringify(message),
        });
      }
      
      
      function Disconnect() {
        const message = {
          code: 101,
          id : USERID
        };
        client.current.publish({
          destination: `/sub/channel/${roomId}`,
          body: JSON.stringify(message),
        })
      }


          // 커넥트 함수 /*
      const connect = () => {

          client.current = new StompJs.Client({
              brokerURL: "ws://localhost:8080/ws",
              onConnect : () => {
                  console.log("connected"); 
                  subscribe();
                  Join();
              },
              onDisconnect : () => {
                  console.log("failed to connect");
                  Disconnect();
              }
          })
          client.current.activate()
      }
      connect();

      window.addEventListener('beforeunload', Disconnect);

    // 컴포넌트가 언마운트될 때 이벤트 핸들러 제거
    return () => {
      window.removeEventListener('beforeunload', Disconnect);
    };

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
        <BottomHost 
          ENTRY = {ENTRY}
        />
      : null}

      {!isHost?
        <BottomGuest 
          client = {client.current}  
          roomId = {roomId}
          role = '1'
          userId = {USERID}
        />
      : null

      }
      <Link href={`/scenario/1`}>링크</Link>
      </div>
    </div>
    </div>

  )
}
