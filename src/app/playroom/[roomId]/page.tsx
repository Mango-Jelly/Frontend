'use client';
import './_component/page.css';
import Link from 'next/link';

// import GuestVideosSection from './_component/GuestVideosSection';
import MemberCarousel from '@/app/tempplayroom/_component/MemberCarousel';

import axios from 'axios';
import HostMainSection from './_component/host/HostMainSection';

// import GuestMainSection from './_component/guest/GuestMainSection';
import GuestMainSection from '@/app/tempplayroom/guest/GuestMainSection';

import HostTheater from './_component/theater/HostTheater';
import { useState } from 'react';
import { useRef, useEffect, useCallback } from 'react';
import * as StompJs from '@stomp/stompjs';
import SockJS from 'sockjs-client';

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

type CameraUnit = {
  userId: string;
  Subscriber: Subscriber;
};

export default function Page({ params: { roomId } }: Props) {
  const [isHost, setIsHost] = useState<boolean>(false);
  const [isStart, setIsStart] = useState<boolean>(false);
  const [ENTRY, setENTRY] = useState<UserStatus[]>([]);
  const [myUserName, setMyUserName] = useState<string>(
    `Participant${Math.floor(Math.random() * 100)}`
  );
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [session, setSession] = useState<any>(undefined);
  const [subscribers, setSubscribers] = useState<CameraUnit[]>([]);
  const [publisher, setPublisher] = useState<any>(undefined);
  const [currentVideoDevice, setCurrentVideoDevice] = useState<any>(null);
  const [role, setRole] = useState('');
  const [call, setCall] = useState('');
  // const [isStart, setStart] = useState<boolean[]>([false, false, false, false]);
  const [first, setfirst] = useState<boolean>(false);
  const [second, setsecond] = useState<boolean>(false);
  const [third, setthird] = useState<boolean>(false);
  const amIhost = useRef<boolean>(false);
  const [goNext, setGoNext] = useState<number>(0);
  const changeHost = () => {
    setIsHost((prevIsHost) => !prevIsHost);
    amIhost.current = !amIhost.current;
  };

  const client = useRef<any>({});
  const OV = useRef(new OpenVidu());
  // 오픈 비두 객체 만듬

  // function StartCallback(i : number, type : boolean){
  //   setStart((prevArray) => {
  //     let newArray = prevArray
  //     newArray[i] = type
  //     return newArray
  //   })
  // }

  function onMessageReceived(message: StompJs.Message) {
    try {
      const messageBody = JSON.parse(message.body);

      if (messageBody.code == 100) {
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

        // setSubscribers((subscribers) => [...subscribers, videoTag])
      } else if (messageBody.code == 101) {
        let videoTag: string = messageBody.videoid;
        setENTRY((ENTRY) =>
          ENTRY.filter((item) => item.name != messageBody.id)
        );
        // setSubscribers((subscribers) => subscribers.filter(vidioId => vidioId != videoTag ))
      }
      // 참가자 중에 문제가 생겼다면
      else if (200 <= messageBody.code && messageBody.code < 300) {
        setENTRY((ENTRY) =>
          ENTRY.map((item) => {
            if (item.name === messageBody.id) {
              item.status = messageBody.code;
            }
            return item;
          })
        );
        setCall(messageBody.id);

        // 카메라 정렬을 위한 코드
        // setSubscribers((prevsub) => {
        //   let newsub : CameraUnit[];
        //   // console.log(prevsub.find((element) => element.userId === `${messageBody.id}'s_video`))
        //   if (prevsub.find((element) => element.userId === messageBody.id ))
        //   {
        //     newsub = [prevsub.find((element) => element.userId === `${messageBody.id}`)].concat(prevsub.filter(e => { return e.userId != messageBody.id }))
        //   }
        //   else
        //   {
        //     newsub = prevsub
        //   }
        //   return newsub;
        // })

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
      } else if (Number(messageBody.code) === 300) {
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
      } else if (messageBody.code === 400) {
        setfirst(true);
        setTimeout(() => {
          setsecond(true);
          setTimeout(() => {
            setthird(true);
            setTimeout(() => {
              setfirst(false);
              setsecond(false);
              setthird(false);
              setIsStart(true);
            }, 5000);
          }, 2000);
        }, 1000);
      }
      // 이게 콜백 지옥 아님?
      else if (messageBody.code === 500) {
        setGoNext((prev) => {
          if (prev > 8) {
            return 1;
          }
          return prev + 1;
        });
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

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////시작부터 마운트 될때////////////////////////시작부터 마운트 될때////////////////////////시작부터 마운트 될때////////////////////////시작부터 마운트 될때////////////////////////시작부터 마운트 될때/////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    const mySession = OV.current.initSession();

    // 새로운 사람이 들어왔다
    mySession.on('streamCreated', (event) => {
      let username = JSON.parse(event.stream.inboundStreamOpts.connection.data);
      const subscriber = mySession.subscribe(event.stream, undefined);
      const CameraUnit = {
        userId: username.clientData,
        Subscriber: subscriber,
      };
      // 나 자신이면 받지않는다.
      if (username.clientData === myUserName) {
        return;
      }
      // newsub = [prevsub.find((element) => element.userId === `${messageBody.id}`)].concat(prevsub.filter(e => { return e.userId != `${messageBody.id}` }))

      setSubscribers((subscribers) => [...subscribers, CameraUnit]);
      setENTRY((entry) => {
        let newEntry: UserStatus[] = [];

        if (
          entry.find((element) => element.name === username.clientData) !==
          undefined
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
        setCurrentVideoDevice(currentVideoDevice);
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
        videoid: `${myUserName}`,
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
        videoid: `${myUserName}`,
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
      {first ? (
        <div className='fadeoutcomponent' style={{ opacity: second ? 1.0 : 0 }}>
          {third ? (
            <video className='w-full h-full' controls autoPlay>
              <source src='.curtainsclosing.mp4' type='video/mp4' />
            </video>
          ) : null}
        </div>
      ) : null}

      <div className='flex flex-col items-center size-full'>
        {isHost || !isStart ? (
          <MemberCarousel call={call} ENTRY={ENTRY} subscribers={subscribers} />
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
            />
          ) : (
            <HostMainSection
              ENTRY={ENTRY}
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
              subscribers={subscribers}
              streamManager={mainStreamManager}
              goNext={goNext}
            />
          ) : (
            <GuestMainSection
              depart='꿈나무 유치원'
              title='망고 연극반'
              client={client.current}
              roomId={roomId}
              curRole={role}
              userId={myUserName ? myUserName : ''}
            />
          )
        ) : null}
      </div>
    </>
  );
}
