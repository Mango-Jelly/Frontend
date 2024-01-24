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
type Roles = {

}

const status : any[] = [status201, status202, status203, status204]
export default function hostrightbox(Props : Props) {
  // console.log(Props.ENTRY)

  return (
    <div className=' rounded-md bg-white mb-5 p-5'>
      {/* <div>
        <h1 className='p-5'>아이들 상태 확인하기</h1>
      </div>
      <div className=' overflow-auto flex flex-rows scroll-auto p-5 h-4/5 '>
        {
          Props.ENTRY.map((entry, id) => (
            <div className='w-1/4 ' key = {id}>
              <div className='h-full mr-[2rem]'>
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
          ))
        }
      </div>  */}

      <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
      {
          Props.ENTRY.map((entry, id) => (
            // <div className='w-1/4 ' key = {id}>
            //   <div className='h-full mr-[2rem]'>
                // <Image
                // src = {BasicUser}
                // alt = "프로필 사진"
                // className='h-[5rem] w-[5rem] '
                // />
            //   </div>

            //   <div className='flex flex-col'>
            //     <p className='text-wrap'>
            //     {entry.name}
            //     </p>
            //     <p className='text-center'>
            //       {false ? '무엇 무엇': '아직 역할이 없어요'}
            //     </p>
            //   </div>
            //   {entry.status ?
            //     <div>
            //       <Image
            //         src={status[entry.status - 201]}
            //         alt="상태사진"
            //         className='h-[5rem] w-[5rem]'
            //       />
            //     </div>
            //     : null
            //   }
            // </div>

            <li className="pb-3 sm:pb-4">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex-shrink-0">
              <Image
                src = {BasicUser}
                alt = "프로필 사진"
                className='h-[5rem] w-[5rem] '
                />

                
                  {/* <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image"> */}
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
            </li>
          ))
        }
      </ul>


    </div>
  )
}
