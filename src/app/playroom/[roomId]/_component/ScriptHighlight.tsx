'use client'

import style from './scrollbar.module.css'
import { ControllScript } from './ControllScript'

import Image from 'next/image'
import CookieHouse from '../../../public/CookieHouse.png'
import {
  PlayCircleIcon,
  PauseCircleIcon,
  StopCircleIcon,
} from '@heroicons/react/24/solid'



export default function ScriptHighlight() {
  let idx = 0
  const { script, curIdx, refs, moveScript } = ControllScript()

  const getDynamicClass = (sceneKey: number, dialogKey: number) => {
    if (sceneKey === curIdx.scene && dialogKey === curIdx.dialog) {
      return 'rounded-xl border-8 border-main font-semibold p-2'
    }
  }

  return (
    <div className='flex justify-center items-center bg-white w-[52rem] h-[16rem] m-4'>
    <p className='text-3xl'>
        {script.scene[curIdx.scene].dialogs[curIdx.dialog].dialog}
    </p>
    </div>
  )
}
