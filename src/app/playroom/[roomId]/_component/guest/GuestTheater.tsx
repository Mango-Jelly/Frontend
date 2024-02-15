'use client'
import { useRef, useEffect, useCallback, useState } from "react";
import style from './scrollbar.module.css'
import { ControllScript } from './ControllScript'
import Image from 'next/image'
import CookieHouse from '@/../public/CookieHouse.png'
import ForestJpeg from '@/../public/ForestJpeg.jpg'
import { Subscriber } from 'openvidu-browser';
import { scriptInfo } from './data/Dummy'
import OpenViduVideoComponent from '../OvVideo';
import StateButtonGridCol from './StateButtonGridCol';

type UserStatus = {
  name: string
  status: number
  role: string
  camera: Subscriber | null
}

type Props = {
  client: any
  goNext: number
  streamManager: any;
  ENTRY: UserStatus[]
  roomId: string
  userId: string
  scriptIdx: number
}

export default function GuestTheater(Props: Props) {
  let idx = 0
  const [actor, setActor] = useState<UserStatus[]>([])
  const { script, curIdx, refs, moveScript } = ControllScript()
  const getDynamicClass = (sceneKey: number, dialogKey: number) => {
    if (sceneKey === curIdx.scene && dialogKey === curIdx.dialog) {
      return 'rounded-xl border-8 border-main font-semibold p-2'
    }
  }

  useEffect(
    () => {
      let roles = new Set<string>();

      scriptInfo.scene[curIdx.scene].dialogs.forEach(element => {
        roles.add(element.role)
      });
      console.log(roles)

      setActor(Props.ENTRY.filter(element => roles.has(element.role)));
      console.log(Props.ENTRY, actor)
    }

    , [curIdx.scene])

  useEffect(
    () => {
      if (Props.goNext) {
        moveScript()
      }
    }, [Props.goNext]
  )
  return (
    <div className='flex h-full w-full relative justify-between px-[5rem]'>
      <div className='bg-white m-4 h-4/5'>
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
          className='overflow-scroll w-[36rem] h-[52rem]  p-4'
          id={style.scroll}
        >
          <div>
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
      </div>

      <div className='w-3/5 h-full'>
        <div className='w-full h-full justify-center p-3 relative '>
          <Image
            src={ForestJpeg}
            alt='배경화면'
            className='object-fill w-full h-[48rem]'
          />
          {
            Props.streamManager ?
              <div className='absolute top-0 left-0 p-[3rem] w-full h-full grid grid-cols-4 gap-4 flex'>
                {
                  actor.map((actor, id) => {
                    return (
                      <div className="z-10 w-full self-end" key={id}>
                        <OpenViduVideoComponent streamManager={actor.camera} />
                      </div>
                    )
                  })
                }

              </div>
              :
              <div className='absolute top-0 left-0 p-[3rem]  w-full h-full'>
                <video controls muted className=' z-10 w-[40rem] h-[30rem]'  >
                  <source src="https://mongo-jelly.s3.ap-northeast-2.amazonaws.com/frontSampleVideo.mp4" type="video/mp4" className='z-10' />
                </video>
              </div>
          }
        </div>

        <div className='flex justify-center items-center bg-white w-full h-1/5  p-3 default-component-color rounded-lg'>
          <p className='text-3xl'>
            {script.scene[curIdx.scene].dialogs[curIdx.dialog].dialog}
          </p>
        </div>
      </div>
      <StateButtonGridCol client={Props.client} userId={Props.userId} roomId={Props.roomId} />
    </div>
  )
}
