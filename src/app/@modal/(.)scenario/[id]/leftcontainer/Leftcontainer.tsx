import React from 'react'
import Image from 'next/image'
import style from '../modal.module.css'

import piggie from '@/../public/piggie.svg'


export default function Leftcontainer() {
  return (
    <div >
      <div className='w-[40rem] h-[65rem] my-auto'>
        <div className='flex justify-center'  >
        <Image 
          src = {piggie}
          alt = "썸네일"
          className='w-[20rem] h-[20rem]'
          />
        </div>
            <div className='flex justify-center mt-[1rem] md-[2rem]'> 
              <h1 className=' w-[30rem] h-[5rem] mt-[1rem] md-[2rem] text-center rounded-[2rem] text-5xl bg-arrow py-[1rem] px-[4rem] m-[1rem]' >돼지렐라</h1>
            </div>
          <div className=''>
            <div className='flex justify-center mt-[1rem] md-[2rem]'>
            <div className='w-[30rem] h-[5rem] md-[1rem] bg-arrow text-4xl rounded-[2rem] text-center py-[1rem] px-[4rem]  m-[1rem]'>참여 가능 인원 : 5명</div>
            </div>
            <div className='flex justify-center mt-[1rem] md-[2rem]'>
            <div className='w-[30rem] h-[5rem] md-[1rem] bg-arrow text-4xl rounded-[2rem] text-center py-[1rem] px-[4rem]'> 예상 소요시간 : 10분 </div>
            </div>
            <div className='flex justify-center mt-[1rem] md-[2rem]'>
            <div className='w-[30rem] h-[20rem] md-[1rem] bg-arrow text-4xl rounded-[2rem]  text-center py-[1rem] px-[4rem]'>
              <h1>등장 인물</h1>
              <div className='flex flex-wrap mt-[2rem]'>
              <Image 
                src = {piggie}
                alt = "등장인물 사진"
                className='w-[5rem] h-[5rem] m-[1rem]'
                />
              <Image 
                src = {piggie}
                alt = "등장인물 사진"

                className='w-[5rem] h-[5rem] m-[1rem]'
                />
              <Image 
                src = {piggie}
                alt = "등장인물 사진"

                className='w-[5rem] h-[5rem] m-[1rem]'
                />
              <Image 
                src = {piggie}
                alt = "등장인물 사진"

                className='w-[5rem] h-[5rem] m-[1rem]'
                />
              <Image 
                src = {piggie}
                alt = "등장인물 사진"

                className='w-[5rem] h-[5rem] m-[1rem]'
                />
                </div>
            </div>
            </div>

          </div>
        </div>
    </div>
  )
}
