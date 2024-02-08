'use client'
import { useRef, useEffect, useCallback, useState } from "react";
import style from './scrollbar.module.css'
import { ControllScript } from './ControllScript'
// import Image from 'next/image'
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

type CameraUnit = {
  userId : string
  Subscriber : Subscriber
}


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


const image = new Image();

image.onload = function() {
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0); // Canvas의 크기를 이미지 크기에 맞게 조절하여 이미지를 그립니다.
};
export default function HostTheater(Props : Props) {
  let idx = 0
  const [actor, setActor] = useState<UserStatus[]>([])
  const { script, curIdx, refs, moveScript } = ControllScript()
  const getDynamicClass = (sceneKey: number, dialogKey: number) => {
    if (sceneKey === curIdx.scene && dialogKey === curIdx.dialog) {
      return 'rounded-xl border-8 border-main font-semibold p-2'
    }
  } 
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaStream = useRef<MediaStream>(null);
  const backgroundImage = useRef<HTMLImageElement>(null)


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
  () => {
    let roles = new Set();

    scriptInfo.scene[curIdx.scene].dialogs.forEach(element => {
      roles.add(element.role)
    });
    console.log(roles)

    setActor(Props.ENTRY.filter(element => roles.has(element.role)));
    }
    ,[curIdx.scene])

  useEffect(
    () => {

      // const mediaStream : MediaStream = canvasRef.current.captureStream()

      const canvas = canvasRef.current
      const image = backgroundImage.current
      // const newImage = new Image( src = image, alt = '시발')
      if (canvas && image){
        let ctx = canvas.getContext('2d')
        ctx.drawImage(image, 0, 0, canvas.width , canvas.height )
        
        // let img = new Image(src = ForestJpeg, alt = '배경화면')

        const mediaStreams = canvas.captureStream()
        // let mediaRecprder = new MediaRecorder(mediaStreams)
      }

    }, [])


  return (
    <div className='flex h-full w-full relative justify-between p-[2rem]'>
      <div className='bg-white m-4 h-full'>
        <div className='flex items-center m-4'>
          <img
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
        <div className='w-full justify-center p-3 relative h-full'>
          {/* <canvas ref={canvasRef} className="h-full w-full" > 
            <img 
              src={ForestJpeg}
              alt='배경화면' 
              className='object-fill w-full h-full'
            />
            { 
              Props.streamManager ? 
              <div className='absolute top-0 left-0 p-[3rem]  w-full h-full grid grid-cols-4 gap-4 flex'>
                {
                  actor.map((actor, id) => {
                    return (
                      <div className="z-10 w-full self-end" key= {id}>
                      <OpenViduVideoComponent streamManager={actor.camera} />
                    </div>
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
          </canvas> */}


        <img 
          
          src={cinderella}
          alt='배경화면' 
          className='h-[72rem] w-[128rem]'
          ref = {backgroundImage}
        />
          <canvas ref={canvasRef} className="h-[72rem] w-[128rem]" >
          {/* 캔버스 내부에 이미지를 그리거나 다른 그래픽을 추가 */}
          {/* { 
            Props.streamManager ? 
            <div className='absolute top-0 left-0 p-[3rem]  w-full h-full grid grid-cols-4 gap-4 flex'>
              {
                actor.map((actor, id) => {
                  return (
                    <div className="z-10 w-full self-end" key= {id}>
                      <OpenViduVideoComponent streamManager={actor.camera} />
                    </div>
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
          } */}


        </canvas>

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
                  <button onClick={() => {console.log('끼얏호우')}}>
                    <StopCircleIcon className='size-20' />
                  </button>
              </div>
              <div className='flex flex-row'>
              </div>
              <div id = "rightbox" className='flex flex-row '>
                  <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:bg-blue-800 font-medium rounded-full text-xl px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:bg-blue-800">종료하기</button>
                  <button type="button"  onClick={() => {console.log('끼얏호우')}} className="text-white bg-blue-700 hover:bg-blue-800 focus:bg-blue-800 font-medium rounded-full text-xl px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:bg-blue-800">시작하기</button>
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
