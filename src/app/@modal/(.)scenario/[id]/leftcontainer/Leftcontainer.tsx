import React from 'react'
import Image from 'next/image'
import style from '../modal.module.css'

import piggie from '@/../public/piggie.svg'


export default function Leftcontainer() {
  return (
    <div >
      <div className='w-[40rem] h-[65rem]'>
        <div className='flex justify-center'  >
        <Image 
          src = {piggie}
          className='w-[20rem] h-[20rem]'
          />
        </div>
            <h1 className='mt-[1rem] md-[2rem] text-center text-5xl bg-arrow'>돼지렐라</h1>
          <div className=''>
            <div className='flex justify-center'>
            <div className='w-[30rem] h-[5rem] md-[1rem] bg-gray-100 text-4xl text-center py-[1rem] px-[4rem]'>d</div>
            </div>
            <div className='flex justify-center'>
            <div className='w-[30rem] h-[5rem] md-[1rem] text-4xl text-center py-[1rem] px-[4rem]'>d</div>
            </div>
            <div className='flex justify-center'>
            <div className='w-[30rem] h-[20rem] md-[1rem] text-4xl text-center py-[1rem] px-[4rem]'>d</div>
            </div>

          </div>
        </div>
    </div>
  )
}
