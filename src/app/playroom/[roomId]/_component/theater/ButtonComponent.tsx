'use client'

import style from './_component/scrollbar.module.css'
import { ControllScript } from './ControllScript'
import { ScriptType , RoleInfo, Dialog, Scene } from './type'

import Image from 'next/image'
import CookieHouse from '../../../public/CookieHouse.png'
import {
  PlayCircleIcon,
  PauseCircleIcon,
  StopCircleIcon,
} from '@heroicons/react/24/solid'

type Props = {
  scriptIdx: number
}

export default function Page(Props : Props) {
  let idx = 0
  const { script, curIdx, refs, moveScript } = ControllScript({scriptIdx : Props.scriptIdx })

  const getDynamicClass = (sceneKey: number, dialogKey: number) => {
    if (sceneKey === curIdx.scene && dialogKey === curIdx.dialog) {
      return 'rounded-xl border-8 border-main font-semibold p-2'
    }
  }

  return (
    <div className='flex'>

      <div className='bg-white m-4'>
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
          className='overflow-auto w-[36rem] h-[60rem] p-4'
          id={style.scroll}
        >
          <div>
            {script.scenes.map((sceneValue , sceneKey) => {
              return (
                <div key={sceneKey}>
                  <p className='sticky top-0 text-lg bg-gray-100 p-2 my-2'>
                    {`${sceneValue.seq}번째 씬`}
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
                          {dialogValue.roles[0].roleImg}
                        </div>
                        <p className='text-xl'>
                          {`${dialogValue.roles[0].roleName}: ${dialogValue.dialog}`}
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


      <div>
        <button onClick={moveScript}>
          <PlayCircleIcon className='size-20' />
        </button>
        <button>
          <PauseCircleIcon className='size-20' />
        </button>
        <button>
          <StopCircleIcon className='size-20' />
        </button>
      </div>
      
      <div className='flex justify-center items-center bg-white w-[52rem] h-[16rem] m-4'>
        <p className='text-3xl'>
          {script.scenes[curIdx.scene].dialogs[curIdx.dialog].dialog}
        </p>
      </div>
    </div>
  )
}
