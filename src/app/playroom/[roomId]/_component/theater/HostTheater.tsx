'use client'
import { useRef, useEffect, useCallback, useState } from "react";
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
import cinderella from '@/../public/cinderella.jpg'
import { OpenVidu, Stream, Subscriber } from 'openvidu-browser';
import UserVideoComponent from '../UserVIdeo'
import GuestStateSection from '../host/rightbox/GuestStateSection'
import { scriptInfo } from './data/Dummy'
import OpenViduVideoComponent from '../OvVideo';
import axios from 'axios'



type UserStatus = {
  name: string
  status: number
  role : string
  camera : Subscriber | null
}


type Props = {
  client : any
  roomId : string
  streamManager : any;
  ENTRY: UserStatus[]
}


export default function HostTheater(Props : Props) {
  let idx = 0
  const [actor, setActor] = useState<UserStatus[]>([])
  const { script, curIdx, refs, moveScript } = ControllScript()
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
  const isNewscene = useRef<boolean>(false)
  const arrVideoData = useRef<BlobPart[]>([])
  const mediaRecorder = useRef<MediaRecorder>()
  // const [Image, setImage] = useState<any>(null)

  function goNext() {
    const message = {
            code: 500,
          };
    Props.client.publish({
        destination: `/sub/channel/${Props.roomId}`,
        body: JSON.stringify(message),
    })
    moveScript()
  }

  useEffect(
    () =>
    {
    isNewscene.current = true
    let roles = new Set();

    scriptInfo.scene[curIdx.scene].dialogs.forEach(element => {
      roles.add(element.role)
    });
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
      }, 300)
    }
    , [curIdx.scene])
  
  useEffect(
    () => {
      // console.log('actor을 재설정했다', actor)
      // console.log(actorDom.current)
      const canvas = canvasRef.current


      if (canvas) {
      let cameraSize = canvas.width / (actorDom.current.length + 1)
      let cameraGap = cameraSize / (actorDom.current.length + 1)

        let ctx = canvas.getContext('2d')
        if (ctx && backgroundImage.current)
        {
          ctx.drawImage(backgroundImage.current, 0, 0, canvas.width, canvas.height);
          setTimeout(() => {
            if (ctx) {
              setTimeout(() => {
                actor.forEach((element, id) => {
                    if (element.camera && actorDom.current[id]) {
                      while (!actorDom.current[id] === null) { continue }
                    if (element && actorDom.current[id]) {
                        element.camera.addVideoElement(actorDom.current[id]);
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
                            50,
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
    }
    , [actor])
  function reload() {
    const canvas = canvasRef.current
    if (canvas && backgroundImage.current)
    {
      canvas.width = backgroundImage.current.width
      canvas.height = backgroundImage.current.height
      let ctx = canvas.getContext('2d');
      console.log('해상도 비교', backgroundImage.current?.width, canvas?.width)
      if (ctx)
      {
        ctx.drawImage(backgroundImage.current, 0, 0, canvas.width, canvas.height);
      }
    }

  }
  
  function startRecording() {

    setIsRecording(true)
      console.log('녹화 시작')

    const mediaStream = canvasRef.current?.captureStream()
    // const options = {
    //     audioBitsPerSecond: 128000,
    //     videoBitsPerSecond: 2500000,
    //     mimeType: "video/mp4",
    //   };

    if (mediaStream) {
      mediaRecorder.current = new MediaRecorder(mediaStream)


      mediaRecorder.current.ondataavailable = (event) =>
      {
        // 스트림 데이터(Blob)가 들어올 때마다 배열에 담아둔다.
        arrVideoData.current.push(event.data);
      }
      
      mediaRecorder.current.onstop = (event)=>{
          // 들어온 스트림 데이터들(Blob)을 통합한 Blob객체를 생성
          const blob = new Blob(arrVideoData.current);

          // BlobURL 생성: 통합한 스트림 데이터를 가르키는 임시 주소를 생성
          const blobURL = window.URL.createObjectURL(blob);
          // 다운로드 구현
          const $anchor = document.createElement("a"); // 앵커 태그 생성
          document.body.appendChild($anchor);
          $anchor.style.display = "none";
          $anchor.href = blobURL; // 다운로드 경로 설정
          $anchor.download = "test.mp4"; // 파일명 설정
          $anchor.click(); // 앵커 클릭
          
          // 배열 초기화
          arrVideoData.current.splice(0);
      }
          // 녹화 시작
          mediaRecorder.current.start();
    }
  }


  return (
    <div className='flex h-full w-full relative justify-between p-[2rem]'>
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
          className='overflow-auto w-[36rem] h-full  p-4'
          id={style.scroll}
        >

            {script.scene.map((sceneValue, sceneKey) => {
              return (
                <div key={sceneKey}>
                  <p className='sticky top-0 text-lg bg-gray-100 p-2 my-2'>
                    {`${sceneValue.sequence}번째 씬`}
                  </p>
                  {sceneValue.dialogs.map((dialogValue, dialogKey) => {
                    return (
                      <div
                        key={dialogKey}
                        ref={(element) => {
                          refs.current[idx++] = element
                        }}
                        className={`flex items-center py-2 ${getDynamicClass(sceneKey, dialogKey)}`}
                      >
                        <div className='shrink-0 bg-gray-200 rounded-full size-12 m-2'>
                          {dialogValue.img}
                        </div>
                        <p className='text-xl'>
                          {`${dialogValue.role}: ${dialogValue.dialog}`}
                        </p>
                      </div>
                    )
                  })}
                </div>
              )
            })}

        </div>
      </div>

      <div className='w-3/5 h-full relative'>
        <div className='w-full justify-center relative h-full'>


            <Image
              src = {cinderella}
              alt='배경화면'
              className='h-full w-full  z-0'
              ref={backgroundImage}
              
            />
          <canvas ref={canvasRef}  style={{ width : '100%', height : '100%'}} className="z-10 absolute top-0 left-0"></canvas>

          
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
                    }} className='z-10 w-full' hidden />
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
        <div className='flex flex-row justify-between px-[5rem]'>
              <div id = "leftbox" className='flex flex-row'>
                  <button type="button" className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">Yellow</button>
                  <button type="button" className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">Yellow</button>
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
                    mediaRecorder.current?.stop()
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
