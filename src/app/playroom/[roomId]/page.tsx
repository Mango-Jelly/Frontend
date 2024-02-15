'use client';
import './_component/page.css';
import Image
from 'next/image'
// import GuestVideosSection from './_component/GuestVideosSection';
import MemberCarousel from '@/app/tempplayroom/_component/MemberCarousel';
import axios from 'axios';
// import HostMainSection from './_component/host/HostMainSection';
import HostMainSection from '@/app/tempplayroom/host/HostMainSection';
// import GuestMainSection from './_component/guest/GuestMainSection';
import GuestMainSection from '@/app/tempplayroom/guest/GuestMainSection';
import curtain from '@/../public/Curtain.jpg'
import HostTheater from './_component/theater/HostTheater';
import { useState } from 'react';
import { useRef, useEffect } from 'react';
import * as StompJs from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useCookies } from 'react-cookie';


import { OpenVidu, Subscriber } from 'openvidu-browser';
import GuestTheater from './_component/guest/GuestTheater';

const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? 'http://mangotail.shop/'
    : 'http://mangotail.shop/';

type Props = {
  params: { roomId: string };
};

type UserStatus = {
  name: string;
  status: number;
  role: string;
  camera: Subscriber | null;
};

export default function Page({ params: { roomId } }: Props) {
  const [isHost, setIsHost] = useState<boolean>(false);
  const [isStart, setIsStart] = useState<boolean>(false);
  const [ENTRY, setENTRY] = useState<UserStatus[]>([]);
  const [myUserName, setMyUserName] = useState<string>(
    `Participant${Math.floor(Math.random() * 100)}`
  );
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState<any>(undefined);
  const [role, setRole] = useState('');
  const [call, setCall] = useState('');
  const [startProcess, setStartProcess] = useState<boolean[]>([false, false, false, false, false, false, false]);
  const amIhost = useRef<boolean>(false);
  // const scriptNum = useRef<number>(999);
  const [scriptNum, setScriptNum] = useState<number>(999);
  const [goNext, setGoNext] = useState<number>(0);
  const changeHost = () => {
    setIsHost((prevIsHost) => !prevIsHost);
    amIhost.current = !amIhost.current;
  };
  const [myHost, setMyHost] = useState<[string, Subscriber | null]>(['', null])
  const client = useRef<any>({});
  const [cookies, setCookie, removeCookie] = useCookies(['OVJSESSIONID']);


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
    await delay(500)
    changeProcess(1, true)
    await delay(500)
    changeProcess(2, true)
    await delay(500)
    changeProcess(3, true)
    await delay(500)
    changeProcess(3, false)
    changeProcess(4, true)


    await delay(500)
    changeProcess(5, true)
    await delay(500)
    setIsStart(true)
    
    changeProcess(5, false)
    await delay(500)

    changeProcess(4, false)
    changeProcess(2, false)
    changeProcess(1, false)
    changeProcess(0, false)
    

  }


  function onMessageReceived(message: StompJs.Message) {
    try {
      const messageBody = JSON.parse(message.body);

      if (messageBody.code == 100)
      {
        if (amIhost) {
          console.log('호스트가 게스트의 이름을 감지')
        }

        setENTRY((entry) => {
          let newEntry: UserStatus[] = [];
          if (
            entry.find((element) => element.name === messageBody.id) ===
            undefined
          ) {
            const state: UserStatus = {
              name: messageBody.id,
              status: 0,
              role: '',
              camera: null,
            };
            newEntry = [state].concat(entry);
          }
          return newEntry;
        });

        if (amIhost.current) {
            const message = {
            code: 102,
            id: myUserName,
          };
          // console.log(JSON.stringify(message))
          client.current.publish({
            destination: `/sub/channel/${roomId}`,
            body: JSON.stringify(message),
      });


        }
      }
      else if (messageBody.code == 101)
      {
        setENTRY((ENTRY) =>
          ENTRY.filter((item) => item.name != messageBody.id)
        );
      }
      // else if (messageBody.code == 102 && !amIhost.current)
      // {
      //   console.log('게스트가 호스트의 이름을 감지', messageBody.id)
      //   if (myHost[0]) { return; }
      //   setMyHost((prev) => [messageBody.id, prev[1]])
      //   let newEntity: UserStatus | undefined = ENTRY.find((element) => (element.name === messageBody.id))
      //   setTimeout(() => {console.log('새로운 객체는 ', newEntity, myHost)}, 500)
        
      //   if (newEntity !== undefined) {
      //     setMyHost((prev) => [messageBody.id, newEntity.camera])
      //   }

      // }
      // 참가자 중에 문제가 생겼다면
      else if (200 <= messageBody.code && messageBody.code < 300)
      {
        setENTRY((ENTRY) =>
          ENTRY.map((item) => {
            if (item.name === messageBody.id) {
              item.status = messageBody.code;
            }
            return item;
          })
        );
        setCall(messageBody.id);

        setENTRY((entry) => {
          let newEntry: UserStatus[] = [];
          if (entry.find((element) => element.name === messageBody.id)) {
            let newEntity: UserStatus | undefined = entry.find(
              (element) => element.name === messageBody.id
            );
            if (newEntity) {
              newEntity.status = messageBody.code;
              newEntry = [newEntity].concat(
                entry.filter((e) => {
                  return e.name != messageBody.id;
                })
              );
            }
          } else {
            newEntry = entry;
          }
          return newEntry;
        });
      }
      else if (Number(messageBody.code) === 300) {
        setENTRY((prevEntry) => {
          let newEntry: UserStatus[] = prevEntry;
          newEntry[
            newEntry.findIndex((arg) => arg.name == messageBody.name)
          ].role = messageBody.role;
          return newEntry.map((arg) => {
            return arg;
          });
        });

        if (!amIhost.current && myUserName === messageBody.name) {
          setRole(messageBody.role);
        }
      }
      else if (messageBody.code === 400) {
        GotoTheater()
      }
    else if (messageBody.code === 500) {
        setGoNext((prev) => {
          if (prev > 8) {
            return 1;
          }
          return prev + 1;
        });
      }
    else if (messageBody.code === 600)
      {
        if (!isHost) {
          setRole('')
        }
        setScriptNum(messageBody.script)
        setENTRY((prevEntry) => {
          return prevEntry.map((userstatuse) => {
            userstatuse.role = ''
            return userstatuse
          })
        })
      }
    } catch (error) {
      console.error('Error parsing received message:', error);
    }
  }

  const createToken = async (sessionId: any) => {
    const response = await axios.post(
      `/openvidu/api/sessions/${sessionId}/connection `,
      {
        headers: {
          Authorization: 'Basic T1BFTlZJRFVBUFA6bWFuZ28=',
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data; // The token
  };

  useEffect(() => {
    const mySession = OV.current.initSession();
    mySession.on('streamCreated', (event) => {
      let username = JSON.parse(event.stream.inboundStreamOpts.connection.data);
      const subscriber = mySession.subscribe(event.stream, undefined);
      console.log('새로 오픈비두 객체 추가', username.clientData, myHost[0])
      if (username.clientData === myHost[0]){
        setMyHost([myHost[0], subscriber])
      }

      setENTRY((entry) => {
        let newEntry: UserStatus[] = [];
        if (
          entry.find((element) => element.name === username.clientData) !== undefined
        ) {
          let newEntity: UserStatus | undefined = entry.find(
            (element) => element.name === username.clientData
          );
          if (newEntity) {
            newEntity.camera = subscriber;
            newEntry = [newEntity].concat(
              entry.filter((e) => {
                return e.name !== username.clientData;
              })
            );
          }
        } else {
          const state: UserStatus = {
            name: username.clientData,
            status: 0,
            role: '',
            camera: subscriber,
          };
          newEntry = [state].concat(entry);
        }
        return newEntry;
      });
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
    setCookie('OVJSESSIONID', '8F5615B350DF6030635BC62572595A20')
    window.addEventListener('beforeunload', Disconnect);
    window.addEventListener('beforeunload', () => {
      mySession.disconnect();
    });

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
        const videoDevices = devices.filter(
          (device) => device.kind === 'videoinput'
        );
        const currentVideoDeviceId = publisher.stream
          .getMediaStream()
          .getVideoTracks()[0]
          .getSettings().deviceId;
        const currentVideoDevice = videoDevices.find(
          (device) => device.deviceId === currentVideoDeviceId
        );
        setMainStreamManager(publisher);
        setPublisher(publisher);

      } catch (error: any) {
        console.log(
          'There was an error connecting to the session:',
          error.code,
          error.message
        );
      }
    });

    const subscribe = () => {
      client.current.subscribe(`/sub/channel/${roomId}`, onMessageReceived);
    };

    function Join() {
      const message = {
        code: 100,
        id: myUserName,

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

      };
      client.current.publish({
        destination: `/sub/channel/${roomId}`,
        body: JSON.stringify(message),
      });
    }

    // 커넥트 함수 /*
    const connect = () => {
      client.current = StompJs.Stomp.over(function () {
        return new SockJS(`https://mangotail.shop/ws`);
      });
      // client.current = new StompJs.Client({
      //   brokerURL: "ws://localhost:8080/ws",
      //   onConnect: () => {
      //     subscribe();
      //     Join();
      //   },
      //   onDisconnect: () => {
      //     Disconnect();
      //   }
      // })

      client.current = StompJs.Stomp.over(function() {return new SockJS(`https://mangotail.shop/ws`)})
      client.current.onConnect = () => {
        subscribe();
        Join();
      };
      client.current.onDisconnect = () => {
        Disconnect();
      };
      client.current.activate();
    };
    connect();
  }, [myUserName, roomId]);

  return (
    <>
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
      


      <div className='flex flex-col items-center size-full'>
        {isHost || !isStart ? (
          <MemberCarousel call={call} ENTRY={ENTRY} />
        ) : null}

        <button
          type='button'
          onClick={changeHost}
          className='text-white bg-blue-700 hover:bg-blue-800 active:bg-blue-800
            font-medium rounded-lg text-sm py-2 focus:outline-none
            absolute top-32 left-4 w-16'
        >
          {isHost ? 'Host' : 'Guest'}
        </button>

        {isHost ? (
          isStart ? (
            <HostTheater
              ENTRY={ENTRY}
              client={client.current}
              roomId={roomId}
              streamManager={mainStreamManager}
              scriptIdx={scriptNum}
            />
          ) : (
            <HostMainSection
              depart='꿈나무 유치원'
              title='망고 연극반'
              ENTRY={ENTRY}
              scriptIdx={scriptNum}
              client={client.current}
              roomId={roomId}
              streamManager={mainStreamManager}
            />
          )
        ) : null}

        {!isHost ? (
          isStart ? (
            <GuestTheater
              client={client.current}
              userId={myUserName ? myUserName : ''}
              ENTRY={ENTRY}
              roomId={roomId}
              streamManager={mainStreamManager}
              goNext={goNext}
              scriptIdx={scriptNum}
            />
          ) : (
            <GuestMainSection
              depart='꿈나무 유치원'
              title='망고 연극반'
              client={client.current}
              roomId={roomId}
                curRole={role}
                myHost ={myHost}
              userId={myUserName ? myUserName : ''}
            />
          )
        ) : null}
      </div>
    </>
  );
}
