'use client';
import './_component/page.css'
import Link from "next/link"
import Image
 from 'next/image'
import GuestVideosSection from './_component/GuestVideosSection'
import axios from 'axios';
import HostMainSection from './_component/host/HostMainSection';
import GuestMainSection from './_component/guest/GuestMainSection';
import HostTheater from './_component/theater/HostTheater'
import { useState } from 'react';
import { useRef, useEffect, useCallback } from "react";
import * as StompJs from "@stomp/stompjs"
import SockJS from 'sockjs-client'

import { OpenVidu, Subscriber } from 'openvidu-browser';
import GuestTheater from './_component/guest/GuestTheater'
import curtain from '@/../public/Curtain.jpg'


const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? 'http://mangotail.shop/' : 'http://mangotail.shop/';


type Props = {
  params: { roomId: string }
}

type UserStatus = {
  name: string
  status: number
  role : string
  camera : Subscriber | null
}


export default function Page({ params: { roomId } }: Props) {
  const [isHost, setIsHost] = useState<boolean>(false)
  const [isStart, setIsStart] = useState<boolean>(false)
  const [ENTRY, setENTRY] = useState<UserStatus[]>([])
  const [myUserName, setMyUserName] = useState<string>(`Participant${Math.floor(Math.random() * 100)}`)
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState<any>(undefined);
  const [currentVideoDevice, setCurrentVideoDevice] = useState<any>(null);
  const [role, setRole] = useState('');
  const [call, setCall] = useState('');
  const [startProcess, setStartProcess] = useState<boolean[]>([false, false, false, false, false, false, false]);
  const amIhost = useRef<boolean>(false);
  const [goNext, setGoNext] = useState<number>(0)
  const changeHost = () => {
    setIsHost(prevIsHost => !prevIsHost);
    amIhost.current = !amIhost.current;
  }

  const client = useRef<any>({});
  const OV = useRef(new OpenVidu());

  const changeProcess = (index : number, isBegin : boolean) => {
    setStartProcess((prev) => {
      return prev.map((arg, id) => 
      {
        if (id === index) arg = isBegin
        return arg
      }) 
    })
  }
  const delay = (ms : number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function GotoTheater() {
        
    changeProcess(0, true)
    await delay(2000)
    
    changeProcess(1, true)
    await delay(2000)
    
    changeProcess(2, true)
    await delay(2000)
    changeProcess(3, true)
    await delay(2000)
    changeProcess(3, false)
    changeProcess(4, true)


    await delay(1000)
    changeProcess(5, true)
    await delay(3000)
    setIsStart(true)
    
    changeProcess(5, false)
    await delay(1000)

    // await delay(1000)
    // changeProcess(6, true)
    // await delay(3000)
    // changeProcess(6, false)
    // await delay(1000)
    
    changeProcess(4, false)
    changeProcess(2, false)
    changeProcess(1, false)
    changeProcess(0, false)
    

  }

  function onMessageReceived(message: StompJs.Message) {

    try {
      const messageBody = JSON.parse(message.body);

      if (messageBody.code == 100) {
        setENTRY((entry) => {
          let newEntry : UserStatus[] = []
          if (entry.find((element) =>  element.name === messageBody.id) === undefined)
          {
            const state : UserStatus = {
              name : messageBody.id,
              status: 0,
              role : '',
              camera : null,
            }
            newEntry = [state].concat(entry)
          }
          return newEntry
        })
      }
      else if (messageBody.code == 101) {
        let videoTag : string = messageBody.videoid
        setENTRY(ENTRY => ENTRY.filter(item => item.name != messageBody.id))
        // setSubscribers((subscribers) => subscribers.filter(vidioId => vidioId != videoTag ))

      }
        // 참가자 중에 문제가 생겼다면
      else if (200 <= messageBody.code && messageBody.code < 300) {
        setENTRY(ENTRY => ENTRY.map((item) => {
          if (item.name === messageBody.id) {
            item.status = messageBody.code
          }
          return item;
        }))
        setCall(messageBody.id)
        
        
        setENTRY((entry) => {

          let newEntry : UserStatus[] = [];
          if (entry.find((element) => element.name === messageBody.id))
          {
            let newEntity : UserStatus | undefined =   entry.find((element) => element.name === messageBody.id)
            if (newEntity){
              newEntity.status = messageBody.code
              newEntry = [newEntity].concat(entry.filter(e => {return e.name != messageBody.id}))
            }
          } else {
            newEntry = entry
          }
          return newEntry;
        })
      }

      else if (Number(messageBody.code) === 300) {

        setENTRY(prevEntry => {
          let newEntry : UserStatus[] = prevEntry
          newEntry[newEntry.findIndex(arg => arg.name == messageBody.name)].role = messageBody.role
          return newEntry.map((arg) => {return arg}) })

        if (!amIhost.current && myUserName === messageBody.name)
        {
          setRole(messageBody.role)
        }
      }
      else if (messageBody.code === 400)
      {


        GotoTheater()
        

      }

      else if (messageBody.code === 500) {
        setGoNext((prev) => {
          if (prev > 8){
            return 1
          }
          return prev + 1
        })
      }


    } catch (error) {
      console.error('Error parsing received message:', error);
    }
  }


  const createToken = async (sessionId: any) => {

    const response = await axios.post(`/openvidu/api/sessions/${sessionId}/connection `  , {
      headers: {
        'Authorization' : 'Basic T1BFTlZJRFVBUFA6bWFuZ28=',
        'Content-Type': 'application/json', },
    });
    return response.data; // The token
  };


  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////시작부터 마운트 될때////////////////////////시작부터 마운트 될때////////////////////////시작부터 마운트 될때////////////////////////시작부터 마운트 될때////////////////////////시작부터 마운트 될때/////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  useEffect(() => {
    
        const mySession = OV.current.initSession();
    
        // 새로운 사람이 들어왔다
        mySession.on('streamCreated', (event) => {
          let username = JSON.parse(event.stream.inboundStreamOpts.connection.data)
          const subscriber = mySession.subscribe(event.stream, undefined);
          const CameraUnit = {
            userId : username.clientData,
            Subscriber : subscriber
          }
          // 나 자신이면 받지않는다.
          if (username.clientData === myUserName) { return; }
        // newsub = [prevsub.find((element) => element.userId === `${messageBody.id}`)].concat(prevsub.filter(e => { return e.userId != `${messageBody.id}` }))

        
        // setSubscribers((subscribers) => [...subscribers, CameraUnit]);
        setENTRY((entry) => {

          let newEntry : UserStatus[] = []

          if (entry.find((element) =>  element.name === username.clientData) !== undefined)
          {
            let newEntity : UserStatus | undefined = entry.find((element) =>  element.name === username.clientData)
            if (newEntity)
            {
              newEntity.camera = subscriber
              newEntry = [newEntity].concat(entry.filter(e => {return e.name !== username.clientData}))
            }
          }
          else
          {
            const state : UserStatus = {
              name : username.clientData,
              status: 0,
              role : '',
              camera : subscriber,
            }
            newEntry = [state].concat(entry)
          }
          return newEntry

        })
      });
      //
      mySession.on('exception', (exception) => {
        console.warn(exception);
      });
  
      // const handleBeforeUnload = () => {
      //   leaveSession();
      // };
  
      // window.addEventListener('beforeunload', handleBeforeUnload);
  
      
      // 웹사이트나갈때 subscribers에서 사라지게하는 코드

      
      window.addEventListener('beforeunload', Disconnect);
      window.addEventListener('beforeunload',() => {mySession.disconnect()});
  
      createToken(roomId).then(async (token) => {
        try {
          await mySession.connect(token.token, { clientData: myUserName });
          let publisher: any = await OV.current.initPublisherAsync(undefined, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: false,
            publishVideo: true,
            resolution: '1280x720',
            frameRate: 30,
            insertMode: 'APPEND',
            mirror: false,
          });
          // 카메라 뜨는 순간 코드
          mySession.publish(publisher);
  
          const devices = await OV.current.getDevices();
          const videoDevices = devices.filter(device => device.kind === 'videoinput');
          const currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
          const currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);
          setMainStreamManager(publisher);
          setPublisher(publisher);
          setCurrentVideoDevice(currentVideoDevice);
        } catch (error: any) {
          console.log('There was an error connecting to the session:', error.code, error.message);
        }
      });
  
    const subscribe = () => {
      client.current.subscribe(`/sub/channel/${roomId}`, onMessageReceived)
    }

    function Join() {
      const message = {
        code: 100,
        id: myUserName,
        videoid : `${myUserName}`
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
        id: myUserName,
        videoid : `${myUserName}`
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
        onConnect: () => {
          subscribe();
          Join();
        },
        onDisconnect: () => {
          Disconnect();
        }
      })

      // client.current = StompJs.Stomp.over(function() {return new SockJS(`https://mangotail.shop/ws`)})
      // client.current.onConnect = () => {
      //   subscribe();
      //   Join();
      // }
      // client.current.onDisconnect = () => {
      //   Disconnect(); 
      // }
      client.current.activate()
    }
    connect();

  }, [myUserName, roomId])


  return (
  <div className={`flex flex-col items-center px-[15rem] h-lvh ` } >
      {/* { isStart[0] ? <div className='fadeoutcomponent' style={{opacity : isStart[1] ? 1.0 : 0}}></div> : null } */}
     
      { startProcess[0] ? <div className='fadeoutcomponent' style={{opacity : startProcess[1] ? 1.0 : 0}}>
        { startProcess[3] ? 
          <div>
            <video className='w-full h-full' controls autoPlay>
                <source src= "./curtainsclosing.mp4" type="video/mp4" />
            </video> 
          </div>
          :
          null
        }
        {
          startProcess[4] ? 
          <div>
            {/* <Image src = {curtain}  alt = {'별거 아님'} className='fadeoutcomponent' style={{ top : startProcess[5] ? `0%` : `-100%` , transition: 'all 1.0s'}}/>  */}
            <Image src = {curtain}  alt = {'별거 아님'} className='fadeoutcomponent' style={{ left : startProcess[5] ? `-50%` : `-100%` , transition: 'all 1.0s'}}/> 
            <Image src = {curtain}  alt = {'별거 아님'} className='fadeoutcomponent' style={{ left : startProcess[5] ? `50%` : `100%` , transition: 'all 1.0s'}}/> 
          </div> 
          :
          null
        }
      </div> : null
       }
     
        <div className='relative h-full w-full'>

          { isHost || (!isStart) ? 
          <GuestVideosSection
            depart='꿈나무 유치원'
            title='망고 연극반'
            call = {call}
            ENTRY={ENTRY}

          /> : null
          }
          <p className='text-center'><button type='button' onClick={changeHost} className="z-20 text-white bg-blue-700 hover:bg-blue-800 active:bg-blue-800   font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 absolute" style={{bottom : '100%'}}>{isHost ? 'Host' : 'Guest'} </button></p>

          <div className='relative h-4/5 w-full'>
            {isHost ?
              isStart ?
                <HostTheater
                ENTRY={ENTRY}
                client={client.current}
                roomId={roomId}
                streamManager={mainStreamManager}
                />
                :
                <HostMainSection
                  ENTRY={ENTRY}
                  client={client.current}
                  roomId={roomId}
                  streamManager={mainStreamManager}
                />
              : null
              }

            {!isHost ?
              isStart ?
              <GuestTheater
              client={client.current}
              userId={myUserName ? myUserName : ''}
              ENTRY={ENTRY}
              roomId={roomId}
              streamManager={mainStreamManager}
              goNext={goNext}
              />
              :
              <GuestMainSection
                client={client.current}
                roomId={roomId}
                role={role}
                userId={myUserName ? myUserName : ''}
              /> 
              : null
            }
            <Link href={`/scenario/1`}>링크</Link>
        </div>
      </div>
    </div>

  )
}
