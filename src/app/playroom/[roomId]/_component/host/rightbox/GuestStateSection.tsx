import React from 'react'
import BasicUser from '@/../public/BasicUser.svg'
import status201 from '@/../public/status201.svg'
import status202 from '@/../public/status202.svg'
import status203 from '@/../public/status203.svg'
import status204 from '@/../public/status204.svg'
import Image
from 'next/image'
import img_clovar from '@/../public/img_clovar.png';
import style from '../_component/scrollbar.module.css';

type UserStatus = {
  name : string
  status : number
  role : string
}

type Props = {
  ENTRY : UserStatus[]
}

const status : any[] = [status201, status202, status203, status204]

export default function GuestStateSection(Props : Props) {
  return (
    <div className=' bg-white shadow w-[30rem] h-[50rem] ml-6 px-4'>
          <div className='flex items-center px-4 py-4'>
        <Image src={img_clovar} width={28} height={28} alt='참가자 상태 확인' />
        <p className='text-3xl font-medium ml-3'>참가자 상태 확인</p>
      </div>
      <div className="overflow-auto h-[43.5rem]">
      {
          Props.ENTRY.map((entry, id) => (
            <div className="flex items-center m-4"
              key={id}
            >
            <div className="flex items-center space-x-4 rtl:space-x-reverse justify-between">
              <div className="flex-shrink-0 flex">
              <Image
                src = {BasicUser}
                alt = "프로필 사진"
                className='h-[5rem] w-[5rem] '
                />
              </div>

              <div className='flex flex-col'>
                <p className='text-wrap'>
                {entry.name}
                </p>
                <p className='text-left'>
                  {entry.role ? entry.role: '아직 역할이 없어요'}
                </p>
              </div>

              {entry.status ?
                <div>
                  <Image
                    src={status[entry.status - 201]}
                    alt="상태사진"
                    className='h-[5rem] w-[5rem]'
                  />
                </div>
                : 
                <span
                  className='h-[5rem] w-[5rem]'
                >

                </span>
              }

              </div>
            </div>
          ))
        }
      </div>


    </div>
  )
}
