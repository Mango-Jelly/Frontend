'use client'

import React from 'react'
import { myVideos } from '../_component/DummyData'
import { Suspense } from 'react'
import VideoViewer from './VideoViewer'
import {
  ArrowDownTrayIcon,
  LockClosedIcon,
  LockOpenIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid'
import BackButton from '@/app/_component/BackButton'

type Props = {
  id: string
}

//TODO : 비디오 불러오기 API 연결

export default function Video({ id }: Props) {
  const videoData = myVideos.find((video) => video.id === id) || myVideos[0]

  return (
    <div className='flex justify-center items-center size-full'>
      <BackButton />
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
        <div className='text-5xl mb-12 font-bold'>{videoData.data.title}</div>
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
