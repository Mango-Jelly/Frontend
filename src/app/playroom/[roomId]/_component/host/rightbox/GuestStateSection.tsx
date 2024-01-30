import React from 'react'
import BasicUser from '@/../public/BasicUser.svg'
import status201 from '@/../public/status201.svg'
import status202 from '@/../public/status202.svg'
import status203 from '@/../public/status203.svg'
import status204 from '@/../public/status204.svg'
import Image
 from 'next/image'

type UserStatus = {
  name : string
  status : number
}

type Props = {
  ENTRY : UserStatus[]
 }

const status : any[] = [status201, status202, status203, status204]

export default function GuestStateSection(Props : Props) {
  return (
    <div className=' rounded-md bg-white mb-5 p-5'>


      <div className="max-w-md divide-y divide-gray-200 ">
      {
          Props.ENTRY.map((entry, id) => (
            <div className="py-3"
              key={id}
            >
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex-shrink-0">
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
                <p className='text-center'>
                  {false ? '무엇 무엇': '아직 역할이 없어요'}
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
                : null
              }
            </div>
            </div>
          ))
        }
      </div>


    </div>
  )
}
