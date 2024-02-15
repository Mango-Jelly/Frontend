'use client'
import { useRef, useEffect, useState } from "react";
import style from './scrollbar.module.css'
import { ControllScript } from './ControllScript'
import Image, { StaticImageData } from 'next/image'
import CookieHouse from '@/../public/CookieHouse.png'
import {
  PlayCircleIcon,
  PauseCircleIcon,
  StopCircleIcon,
} from '@heroicons/react/24/solid'
import ForestJpeg from '@/../public/ForestJpeg.jpg'
import { OpenVidu, Stream, Subscriber } from 'openvidu-browser';
import GuestStateSection from '../host/rightbox/GuestStateSection'
import axios from 'axios'
import VideoIcon from '@/../public/VideoIcon.svg';
import VideoOffIcon from '@/../public/VideoOffIcon.svg';
import MicIcon from '@/../public/MicIcon.svg';
import MicOffIcon from '@/../public/MicOffIcon.svg';
import { ScriptType , RoleInfo, Dialog, Scene } from './type'


type UserStatus = {
  name: string
  status: number
  role : string
  camera: Subscriber | null
}


type Props = {
  client : any
  roomId : string
  streamManager: any;
  scriptIdx : number
  ENTRY: UserStatus[]
}

interface HTMLMediaElementWithCaptureStream extends HTMLMediaElement{
  captureStream(): MediaStream;
}

export default function HostTheater(Props : Props) {
  let idx = 0
  const [actor, setActor] = useState<UserStatus[]>([])
  const { script , curIdx, refs, moveScript } = ControllScript( {scriptIdx : Props.scriptIdx })
  const getDynamicClass = (sceneKey: number, dialogKey: number) =>
  {
    if (sceneKey === curIdx.scene && dialogKey === curIdx.dialog)
    {
      return 'rounded-xl border-8 border-main font-semibold p-2'
    }
  }
  const [isRecording, setIsRecording] = useState<boolean>(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const backgroundImage = useRef<HTMLImageElement>(null)
  const actorDom = useRef<HTMLVideoElement[]>([])
  const controlButtonClass =
  'rounded-[2rem] bg-main px-6 py-2 m-1 hover:bg-maindark';
  const isNewscene = useRef<boolean>(false)
  const arrVideoData = useRef<BlobPart[]>([])
  const arrAudioData = useRef<BlobPart[]>([])
  const mediaRecorder = useRef<MediaRecorder>()
  const mediaRecorder2 = useRef<MediaRecorder>()
  const mapping = useRef<Map<string, any | null>> (new Map())
  const [isCameraOn, setCameraOn] = useState(true);
  const [isAudioOn, setAudioOn] = useState(true);
  const fileMovie = useRef<File>()
  const fileAudio = useRef<File>()

  const curIdxD = useRef<number>(0)

  const toggleCamera = () => {
    setCameraOn((prev) => !prev);
  };

  const toggleAudio = () => {
    setAudioOn((prev) => !prev);
  };

  function goNext() {
    const message = {
            code: 500,
          };
    Props.client.publish({
        destination: `/sub/channel/${Props.roomId}`,
        body: JSON.stringify(message),
    })
    moveScript()
    curIdxD.current++
  }

  useEffect(
    () =>
    {
      // console.log('link1')

    isNewscene.current = true
    let roles = new Set();
    // if (!script){return}
    script.scenes[curIdx.scene].dialogs.forEach( element => {
      // roles.add(element.roles)
      element.roles.forEach((roless) => {
        roles.add(roless.roleName)
        })
      });
      console.log(roles, script.scenes[curIdx.scene].dialogs)
      actorDom.current = []
      actorDom.current.length = roles.size
      const canvas = canvasRef.current

      if (canvas && backgroundImage.current)
      {
        canvas.width = backgroundImage.current.width
        canvas.height = backgroundImage.current.height
        let ctx = canvas.getContext('2d');
        if (ctx)
        {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
        }
      }
    
      setActor(Props.ENTRY.filter(element => roles.has(element.role)));
      setTimeout(() => {
        isNewscene.current = false
      }, 500)
    }
    , [curIdx.scene, script.title])
  
  
  
  useEffect(
    () => {
      // console.log('link2', actor)
      const canvas = canvasRef.current
      isNewscene.current = true

      setTimeout(() => {
        isNewscene.current = false
        mapping.current.clear()
        if (canvas) {
        let cameraSize = canvas.width / (actorDom.current.length + 1)
        let cameraGap = cameraSize / (actorDom.current.length + 1)
  
          let ctx = canvas.getContext('2d')
          if (ctx && backgroundImage.current)
          {
            ctx.drawImage(backgroundImage.current, 0, 0, canvas.width, canvas.height);
            setTimeout(() => {
              if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                setTimeout(() => {
                  actor.forEach((element, id) => {
                      if (element.camera && actorDom.current[id]) {
                        while (!actorDom.current[id] === null) { continue }
                      if (element && actorDom.current[id]) {
                          element.camera.addVideoElement(actorDom.current[id]);
                          mapping.current.set(element.role, element.camera)
                        }
                      }
                  });
          
                  actorDom.current.forEach(
                    (element, id) => {
                      (function loop() {
                          if (isNewscene.current) {
                              return;
                          }
                          if (ctx && element)
                          ctx.drawImage(
                              element,
                              cameraGap * (id + 1) + cameraSize * id,
                              canvas.height - (cameraSize * 9) / 16 - 50,
                              cameraSize,
                              (cameraSize * 9) / 16
                          );
                          setTimeout(loop, 1000 / 30); // drawing at 30fps
                      })();
                      });
                  }, 2000);
              }
          }, 300);
          }
        }
      }, 1000)

    }
    , [actor])


  function reload() {
    const canvas = canvasRef.current
    if (canvas && backgroundImage.current)
    {
      canvas.width = backgroundImage.current.width
      canvas.height = backgroundImage.current.height
      let ctx = canvas.getContext('2d');
      // console.log('해상도 비교', backgroundImage.current?.width, canvas?.width)
      if (ctx)
      {
        ctx.drawImage(backgroundImage.current, 0, 0, canvas.width, canvas.height);
      }
    }
  }
  

  // 녹화 시작한다
  function startRecording() {

    setIsRecording(true)
    const mediaStream = canvasRef.current?.captureStream()
    

    const options = {
        audioBitsPerSecond: 0,
        videoBitsPerSecond: 2500000,
        // mimeType: "video/webm",
      };
    const speechVideo = mapping.current.get(script.scenes[curIdx.scene].dialogs[curIdx.dialog].roles[0].roleName)
    // console.log(mapping.current, '과연 여기에 있을까요? ' , speechVideo, script.scenes[curIdx.scene].dialogs[curIdx.dialog].roles[0].roleName)
    if (speechVideo)
    {
      // const mediaStream2 = speechVideo.captureStream()
      // console.log(speechVideo.stream.getMediaStream().getAudioTracks())
      // const audioTrack = speechVideo.stream.getMediaStream().getAudioTracks()

      const mediaStream2 = new MediaStream()
      // mediaStream2.addTrack(audioTrack[0])
      
      for (let role  of script.scenes[curIdx.scene].dialogs[curIdx.dialog].roles)
      {
        if (mapping.current.get(role.roleName) !== undefined )
        {
          console.log(mapping.current.get(role.roleName).stream.getMediaStream().getAudioTracks()[0])
          mediaStream2.addTrack(mapping.current.get(role.roleName).stream.getMediaStream().getAudioTracks()[0])
        }
      }
      console.log(script.scenes[curIdx.scene].dialogs[curIdx.dialog].roles)

      if (mediaStream) {
        mediaRecorder.current = new MediaRecorder(mediaStream, options)
        mediaRecorder2.current = new MediaRecorder(mediaStream2)


        mediaRecorder.current.ondataavailable = (event) =>
        {
          // 스트림 데이터(Blob)가 들어올 때마다 배열에 담아둔다.
          arrVideoData.current.push(event.data);
        }
        mediaRecorder2.current.ondataavailable = (event) => {
          arrAudioData.current.push(event.data)
        }
        
        mediaRecorder.current.onstop = (event) => {

            // 들어온 스트림 데이터들(Blob)을 통합한 Blob객체를 생성
            const blob = new Blob(arrVideoData.current);
            // BlobURL 생성: 통합한 스트림 데이터를 가르키는 임시 주소를 생성
            // const blobURL = window.URL.createObjectURL(blob);
            // 다운로드 구현
            // const $anchor = document.createElement("a"); // 앵커 태그 생성
            // document.body.appendChild($anchor);
            // $anchor.style.display = "none";
            // $anchor.href = blobURL; // 다운로드 경로 설정
            // $anchor.download = "test.webm"; // 파일명 설정
            // $anchor.click(); // 앵커 클릭
            
            
            // const blob2 = new Blob(arrAudioData.current, { 'type' : 'audio/mp3' });
            // const audioURL = window.URL.createObjectURL(blob2);
            // const b = document.createElement('a');
            // b.href = audioURL;
            // b.download = 'audio.mp3';
            // b.click();
            // arrAudioData.current.splice(0)
            // 배열 초기화
            const newFile = new File([blob], `00${curIdxD.current}.webm`)
            // fileMovie.current = new File([blob], `00${curIdxD.current}.webm`)
            const blobURL = window.URL.createObjectURL(newFile);
            const a = document.createElement("a")
            a.href = blobURL
            a.download = newFile.name
            a.click()
            const fd = new FormData()
            fd.append('movie' , newFile)
            // fd.append('audio' , '')

            try {
              axios.post( 'https://mangotail.shop/api/v1/movie/scene', fd,  {
              headers: {
                'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiYXV0aCI6IlJPTEVfTUVNQkVSIiwiZXhwIjoxNzA4MzkwODAzfQ.bP0l34PxJNTlUxFvURAxdZkvYfGpmI4U_VJuXHxMnv0mmc9tleUbZKjtg8iZ_5wetlkzTw1CmO7KVVVzkNKHrg=',
                'Content-Type': 'application/json',
              },
              params : {
                sceneId : curIdx.scene
              }
            }
            ).then((gogo) => {
              console.log(gogo)
            }).catch((error) => {
              console.log(error)
            })} catch(e) {
            console.log('시발')
          }


            arrVideoData.current.splice(0);
        }
        mediaRecorder2.current.onstop = (event) => {
          const blob = new Blob(arrAudioData.current, { 'type' : 'audio/mp3' });
          // const audioURL = window.URL.createObjectURL(blob);
          // const b = document.createElement('a');
          // b.href = audioURL;
          // b.download = 'audio.mp3';
          // b.click();


          const newFile = new File([blob], `00${curIdxD.current}.mp3`)
          // fileMovie.current = new File([blob], `00${curIdxD.current}.webm`)
          const blobURL = window.URL.createObjectURL(newFile);
          const b = document.createElement("a")
          b.href = blobURL
          b.download = newFile.name
          b.click()

          const fd = new FormData()
          fd.append('audio' , newFile)
          try {
              axios.post( 'https://mangotail.shop/api/v1/movie/scene', fd,  {
              headers: {
                'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiYXV0aCI6IlJPTEVfTUVNQkVSIiwiZXhwIjoxNzA4MzkwODAzfQ.bP0l34PxJNTlUxFvURAxdZkvYfGpmI4U_VJuXHxMnv0mmc9tleUbZKjtg8iZ_5wetlkzTw1CmO7KVVVzkNKHrg=',
                'Content-Type': 'application/json',
              },
              params : {
                sceneId : curIdx.scene
              }
            }
            ).then((gogo) => {
              console.log(gogo)
            }).catch((error) => {
              console.log(error)
            })
        
        } catch(e) {
            console.log('시발')
          }


          arrAudioData.current.splice(0)
        }
          mediaRecorder.current.start();
          mediaRecorder2.current.start();
    }
    }
  }


  return (
    <div className='flex h-full w-fit relative justify-between p-[2rem]'>


      <div className='bg-white m-4 h-full'>
        <div className='flex items-center m-4'>
          <Image
            src={CookieHouse}
            width={24}
            height={24}
            alt='현재 연극 대본'
          />
          <p className='text-3xl'>현재 연극 대본</p>
        </div>


        <div
          className='overflow-auto w-[30rem] h-[50rem]  p-4'
          id={style.scroll}
        >
          
            {script.scenes.map((sceneValue :Scene, sceneKey) => {
              return (
                <div key={sceneKey}>
                  <p className='sticky top-0 text-lg bg-gray-100 p-2 my-2'>
                    {`${sceneValue.seq}번째 씬`}
                  </p>
                  {sceneValue.dialogs.map((dialogValue : Dialog, dialogKey) => {
                    return (
                      <div
                        key={dialogKey}
                        ref={(element) => {
                          refs.current[idx++] = element
                        }}
                        className={`flex items-center py-2 ${getDynamicClass(sceneKey, dialogKey)}`}
                      >
                          <Image
                            src={dialogValue.roles[0].roleImg}
                            alt='배격사진'
                            width={100}
                            height={100}
                            className="object-cover w-[3rem] h-[3rem] rounded-full shrink-0 mr-[1rem]"
                          />
                          {
                            dialogValue.roles
                            ?
                            <p className='text-xl'> {`${dialogValue.roles[0].roleName}: ${dialogValue.dialog}`}</p>
                            :
                            <p className='text-xl'> {`${dialogValue.roles[0]}: ${dialogValue.dialog}`} </p>
                          }
                        
                      </div>
                    )
                  })}
                </div>
              )
            })}

        </div>
        
      </div>

      <div className='w-[96rem] h-[54rem] relative'>
        <div className='w-full justify-center relative h-full'>
            <Image
              src = {script.scenes[curIdx.scene].background}
              width={1280}
              height={720}
              alt='배경화면'
              className='h-full w-full  z-0 rounded-2xl'
              ref={backgroundImage}
            />
          <canvas ref={canvasRef}  style={{ width : '100%', height : '100%'}} className="z-10 absolute top-0 left-0 rounded-2xl"></canvas>

          {
            Props.streamManager ?
              <div className='absolute top-0 left-0 p-[3rem]  w-full h-full grid grid-cols-4 gap-4 flex z-0'>
              {
                actor.map((actor, id) => {
                  return (
                    // <div className="z-10 w-full self-end" key = {id} ref = {(element) => {actorDom.current[id] = element}} hidden>
                    //   <OpenViduVideoComponent streamManager={actor.camera} />
                    // </div>
                    <video key={actor.name} autoPlay={true} ref={(element) => {
                      if (element) { actorDom.current[id] = element }
                    }} className='z-10 w-full rounded-2xl' hidden />
                  )
                })
              }
            </div>
            :
            <div className='absolute top-0 left-0 p-[3rem]  w-full h-full'>
              <video controls muted className=' z-10 w-[40rem] h-[30rem]'  >
                <source src="https://mongo-jelly.s3.ap-northeast-2.amazonaws.com/frontSampleVideo.mp4" type="video/mp4" className='z-10'/>
              </video>
            </div>
          }
        </div>
        
        <div className='flex flex-row justify-between px-[5rem] py-[1rem]'>
              <div id = "leftbox" className='flex flex-row'>
              <button onClick={toggleCamera} className={controlButtonClass}>
                {isCameraOn ? (
                  <Image src={VideoIcon} width={32} height={32} alt='카메라 끄기' />
                ) : (
                  <Image
                    src={VideoOffIcon}
                    width={32}
                    height={32}
                    alt='카메라 켜기'
                  />
                )}
              </button>
              <button onClick={toggleAudio} className={controlButtonClass}>
                {isAudioOn ? (
                  <Image src={MicIcon} width={32} height={32} alt='마이크 끄기' />
                ) : (
                  <Image src={MicOffIcon} width={32} height={32} alt='마이크 켜기' />
                )}
              </button>
                  <button onClick={goNext}>
                    <PlayCircleIcon className='size-20' />
                  </button>
                  <button>
                    <PauseCircleIcon className='size-20' />
                  </button>
            <button onClick={() => {
                    reload()
                    }}>
                    <StopCircleIcon className='size-20' />
                  </button>
              </div>
              <div className='flex flex-row'>
              </div>
              <div id = "rightbox" className='flex flex-row '>
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:bg-blue-800 font-medium rounded-full text-xl px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:bg-blue-800">종료하기</button>
            
            {
              isRecording ?
                <button type="button" onClick=
                  {() => {
                    setIsRecording(false)
                    mediaRecorder2.current?.stop()
                    mediaRecorder.current?.stop()

                    // const body = {

                    // }
                    // try {
                    //     axios.post( 'https://mangotail.shop/api/v1/movie/scene', body,  {
                    //     headers: {
                    //       'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiYXV0aCI6IlJPTEVfTUVNQkVSIiwiZXhwIjoxNzA4MzkwODAzfQ.bP0l34PxJNTlUxFvURAxdZkvYfGpmI4U_VJuXHxMnv0mmc9tleUbZKjtg8iZ_5wetlkzTw1CmO7KVVVzkNKHrg=',
                    //       'Content-Type': 'application/json',
                    //     },
                    //     params : {
                    //       sceneId : 
                    //     }
                    //   })
                    // }catch(e){
                    //   console.log(e)
                    // }
        
                    
        
                  }} className="text-white bg-blue-700 hover:bg-blue-800 focus:bg-blue-800 font-medium rounded-full text-xl px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:bg-blue-800">녹화 멈추기</button>
                :
                <button type="button" onClick={() => { startRecording() }} className="text-white bg-blue-700 hover:bg-blue-800 focus:bg-blue-800 font-medium rounded-full text-xl px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:bg-blue-800">녹화 하기</button>
            }
              </div>
            </div>
        </div>
        <div className = 'w-1/5 h-full'>
        <GuestStateSection
                ENTRY = {Props.ENTRY}
              />
        </div>

    </div>
  )
}
