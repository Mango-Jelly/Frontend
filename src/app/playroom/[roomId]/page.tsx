'use client';
import style from '@/app/_component/modal.module.css'
import Link from "next/link"
import Top from './_component/top'
// import { useRouter } from 'next/router'

import BottomHost from './_component/host/bottomhost';
import BottomGuest from './_component/guest/bottomguest';
import { useState } from 'react';

type Props = {
  params: { roomId: string }
}

export default function Page({ params: { roomId } }: Props) {
  const [isHost, setIsHost] = useState(false)

  const changeHost = () => {
    setIsHost(a => !a)
  }
  // const rour = useRouter();
  return (
    // TODO : 화상 채팅방 구현
    // <div className='w-[144rem]'>
    <div className='flex flex-col items-center'>
      <div className=''>
        <Top
          depart='꿈나무 유치원'
          title='망고 연극반'
        />
        {/* <h1>화상 채팅방</h1> */}
        {/* <p> 안녕하세요 {roomId}</p> */}
        <p className='text-center'><button type='button' onClick={changeHost} className="text-white bg-blue-700 hover:bg-blue-800 active:bg-blue-800   font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{isHost ? 'Host' : 'Guest'}  </button></p>

        <div className='bottomcontainer'>
          {isHost ?


            <BottomHost />
            : null}

          {!isHost ?


            <BottomGuest />

            : null

          }
          <Link href={`/scenario/1`}>링크</Link>
        </div>
      </div>
    </div>

  )
}
