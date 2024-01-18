import React from 'react'
import VideoImage from '@/../public/VideoTag.svg'
import Image
 from 'next/image'


export default function bottomguestleft() {
  return (
    <div className='p-3'>
        <h1 className='text-8xl text-center'> 우리 선생님 화면 </h1>
        <Image 
        src={VideoImage}/>

    </div>
  )
}
