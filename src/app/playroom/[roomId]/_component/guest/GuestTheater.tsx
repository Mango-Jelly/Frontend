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
  role: string
  roleImg : string
  camera: Subscriber | null
}


type Props = {
  client: any
  goNext: number
  streamManager: any;
  curRole: string;
  ENTRY: UserStatus[]
  roomId: string
  userId: string
  scriptIdx: number
}

export default function GuestTheater(Props: Props) {
  let idx = 0
  const [actor, setActor] = useState<UserStatus[]>([])
  const { script, curIdx, refs, moveScript } = ControllScript({scriptIdx : Props.scriptIdx })
  const getDynamicClass = (sceneKey: number, dialogKey: number) => {
    if (sceneKey === curIdx.scene && dialogKey === curIdx.dialog) {
      return 'rounded-xl border-8 border-main font-semibold p-2'
    }
  }

  useEffect(
    () => {
      let roles = new Set<string>();
      script.scenes[curIdx.scene].dialogs.forEach(element => {
        element.roles.forEach((roless) => {
          roles.add(roless.roleName)
        })
      });
      console.log(roles)
      
      setActor(Props.ENTRY.filter(element => roles.has(element.role)));
      setActor(prev => [{
              name: Props.userId,
              status: 0,
              role: Props.curRole,
              roleImg: '',
              camera: Props.streamManager,
            }].concat(prev))
      console.log(Props.ENTRY, actor)
    }

    , [curIdx.scene, script.title])

  useEffect(
    () => {
      if (Props.goNext) {
        moveScript()
      }
    }, [Props.goNext]
  )
  return (
    <div className='flex h-full w-full relative justify-between px-[5rem]'>


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

      <div className='w-3/5 h-full'>
        <div className='w-full h-full justify-center p-3 relative '>
            <Image
              src = {script.scenes[curIdx.scene].background}
              width={1280}
              height={720}
              alt='배경화면'
              className='h-full w-full  z-0 rounded-2xl'
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

        <div className='flex justify-center items-center bg-white w-full h-[15rem]  p-3 default-component-color rounded-lg'>
          <p className='text-3xl'>
            {script.scenes[curIdx.scene].dialogs[curIdx.dialog].dialog}
          </p>
        </div>
      </div>
      <StateButtonGridCol client={Props.client} userId={Props.userId} roomId={Props.roomId} />
    </div>
  )
}
