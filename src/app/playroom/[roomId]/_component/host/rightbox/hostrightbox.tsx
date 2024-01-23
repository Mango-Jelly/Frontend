import React from 'react'
import BasicUser from '@/../public/BasicUser.svg'
import Image
 from 'next/image'


type Props = {
  ENTRY : string[]
 }
type Roles = {

}

export default function hostrightbox(Props : Props) {
  // console.log(Props.ENTRY)

  return (
    <div className=' rounded-md bg-white mb-5 p-5'>
      <div>
        <h1 className='p-5'>아이들 상태 확인하기</h1>
      </div>
      <div className=' overflow-auto scroll-auto p-5 h-4/5 '>
        {
          Props.ENTRY.map((entry) => (
            <div className='h-[6rem]  flex '>
              <div className='h-[6rem] mr-[2rem]'>
                <Image
                src = {BasicUser}
                alt = "프로필 사진"
                className='h-[5rem] w-[5rem] '
                />
              </div>

              <div className='flex flex-col'>
                <p className='text-wrap'>
                {entry}
                </p>
                <p className='text-center'>
                  {false ? '무엇 무엇': '아직 역할이 정해지지 않았음'}
                </p>
              </div>
            </div>
          ))
        }
      </div> 
    </div>
  )
}
