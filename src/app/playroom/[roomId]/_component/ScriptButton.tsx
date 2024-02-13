'use client'


import { ControllScript } from './ControllScript'
import style from './scrollbar.module.css'
import Image from 'next/image'
import CookieHouse from '../../../public/CookieHouse.png'
import {
  PlayCircleIcon,
  PauseCircleIcon,
  StopCircleIcon,
} from '@heroicons/react/24/solid'


export default function ScriptButton() {

    const { script, curIdx, refs, moveScript } = ControllScript()

    return (
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
    )
}