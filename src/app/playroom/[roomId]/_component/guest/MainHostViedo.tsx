import React from 'react'
import VideoImage from '@/../public/VideoTag.svg'
import Image
 from 'next/image'

export default function MainHostViedo() {
  return (
    <div className='pl-[7rem] pt-[2rem] w-full'>
        <h1 className='text-6xl text-center py-[1rem]'> 우리 선생님 화면 </h1>
        <Image 
        alt = '메인화면'
        src={VideoImage}
        className='h-5/6 object-cover'/>

    </div>
  )
}
