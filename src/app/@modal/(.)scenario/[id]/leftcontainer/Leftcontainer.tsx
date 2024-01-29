import React from 'react'
import Image from 'next/image'
import style from '../modal.module.css'

import piggie from '@/../public/piggie.svg'

// TODO : 데이터  바인딩 필요, 프롭스를 받아서 해당하는 데이터를 바인딩할 것

export default function Leftcontainer() {
  return (
    <div className='flex-col align-middle w-[38.5rem] h-[63.4rem] bg-white p-5 m-5 font-bold'>
      <div className='flex justify-center'>
        <Image
          src={piggie}
          alt="썸네일"
          className='w-[20rem] h-[20rem]'
        />
      </div>
      <div className='flex justify-center mt-[1rem] md-[2rem]'>
        <h1 className=' w-[30rem] h-[5rem] mt-[1rem] md-[2rem] text-center rounded-[2rem] text-5xl py-[1rem] px-[4rem] m-[1rem]  font-bold' >돼지렐라</h1>
      </div>
      <div className=''>
        <div className='flex justify-center mt-[1rem] md-[2rem]'>
          <div className='w-[30rem] h-[5rem] md-[1rem] bg-arrow text-4xl rounded-[2rem] text-center py-[1rem] px-[4rem]'>참여 가능 인원 : 5명</div>
        </div>
        <div className='flex justify-center mt-[1rem] md-[2rem]'>
          <div className='w-[30rem] h-[5rem] md-[1rem] bg-arrow text-4xl rounded-[2rem] text-center py-[1rem] px-[4rem]'> 예상 소요시간 : 10분 </div>
        </div>
        <div className='flex justify-center mt-[1rem] md-[2rem]'>
          <div className='w-[30rem] h-[20rem] md-[1rem] bg-arrow rounded-[2rem]  text-3xl text-center py-[1rem] px-[4rem]'>
            <p>등장 인물</p>
            <div className='flex flex-wrap mt-[2rem]'>
              <Image
                src={piggie}
                alt="등장인물 사진"
                className='w-[5rem] h-[5rem] m-[1rem]'
              />
              <Image
                src={piggie}
                alt="등장인물 사진"

                className='w-[5rem] h-[5rem] m-[1rem]'
              />
              <Image
                src={piggie}
                alt="등장인물 사진"

                className='w-[5rem] h-[5rem] m-[1rem]'
              />
              <Image
                src={piggie}
                alt="등장인물 사진"

                className='w-[5rem] h-[5rem] m-[1rem]'
              />
              <Image
                src={piggie}
                alt="등장인물 사진"

                className='w-[5rem] h-[5rem] m-[1rem]'
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
