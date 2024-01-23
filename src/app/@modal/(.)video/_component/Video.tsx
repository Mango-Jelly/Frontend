'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import style from './video.module.css'
import { myVideos } from '../_component/DummyData'
import { Suspense } from 'react'
import VideoViewer from './VideoViewer'
import video from '../../../../../public/dummyData/video.mp4'
import {
  ArrowDownTrayIcon,
  LockClosedIcon,
  LockOpenIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid'

type Props = {
  id: string
}

export default function Video({ id }: Props) {
  const router = useRouter()

  const onClickClose = () => {
    router.back()
  }

  const videoData = myVideos.find((video) => video.id === id) || myVideos[0]

  return (
    <div className='flex justify-center items-center size-full'>
      <button
        title='close'
        onClick={onClickClose}
        className='absolute top-4 right-4'
      >
        <XMarkIcon className='fill-gray-400 size-10' />
      </button>
      <div className='flex flex-col justify-center items-center bg-white/80 w-[30%] h-[88%] m-2'>
        <div className='bg-gray-200 rounded-full size-72'></div>
        <p className='text-3xl font-bold m-4'>{videoData.data.scriptName}</p>
        <div className='flex justify-center items-center text-xl bg-gray-200 rounded-3xl w-4/5 h-20 m-2'>
          {videoData.data.department}
        </div>
        <div className='flex justify-center items-center text-xl bg-gray-200 rounded-3xl w-4/5 h-20 m-2'>
          {videoData.data.createAt}
        </div>
        <div className='flex flex-col justify-center items-center text-xl bg-gray-200 rounded-3xl w-4/5 h-72 m-2'>
          {videoData.data.party.split('_').map((value, key) => {
            return <div key={key}>{`${value}\n`}</div>
          })}
        </div>
      </div>

      <div className='flex flex-col justify-center items-center bg-white/80 w-[62%] h-[88%] m-2 p-12'>
        <div className='text-2xl mb-12'>{videoData.data.title}</div>
        <div className='flex justify-end  w-full mb-8'>
          <ArrowDownTrayIcon className='size-8 mx-2' />
          {videoData.data.isPublic ? (
            <LockOpenIcon className='size-8 mx-2' />
          ) : (
            <LockClosedIcon className='size-8 mx-2' />
          )}
        </div>
        <div className='bg-gray-200 w-full h-[70%] rounded-3xl'>
          <Suspense fallback={<p>Loading video...</p>}>
            <VideoViewer />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
