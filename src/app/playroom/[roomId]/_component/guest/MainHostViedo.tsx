import React from 'react'
import VideoImage from '@/../public/VideoTag.svg'
import Image
  from 'next/image'

export default function MainHostViedo() {
  return (
    <div className='ml-[7rem] mt-[2rem] w-[68rem]'>
      <h1 className='text-6xl text-center my-[1rem]'> 우리 선생님 화면 </h1>
      <Image
        alt='메인화면'
        src={VideoImage}
        className='h-[42rem]'
      />

    </div>
  )
}
