'use client'

import Link from 'next/link'

import Image from 'next/image'
import planetIcon from '../../public/YellowPlanetIcon.png'
import pinIcon from '../../public/YellowPinIcon.png'

import { PlayIcon } from '@heroicons/react/24/solid'

// const videos = [1, 2, 3]
// const scenarios = [1, 2, 3]

const myVideos = [
  '신데렐라',
  '아기돼지 삼형제',
  '백설공주',
  '헨젤과 그레텔',
  '공주와 개구리',
]

const videos = [
  { title: '신데렐라', department: '싸피 유치원' },
  { title: '아기돼지 삼형제', department: '싸피 어린이집' },
  { title: '백설공주', department: '싸피 초등학교' },
  { title: '대본 제목', department: '소속 기관' },
  { title: '대본 제목', department: '소속 기관' },
  { title: '대본 제목', department: '소속 기관' },
]

export default function Page() {
  return (
    <main>
      <div className='flex flex-col items-center h-screen'>
        <Link href='/newroom'>
          <button
            type='button'
            className='relative bg-white hover:bg-gray-100 rounded-3xl w-96 h-24 mx-6 my-6 shadow'
          >
            <div className='flex items-center ml-16'>
              <p className='text-3xl text-highlight font-extrabold'>
                동화 속으로 떠나기
              </p>
              <PlayIcon className='fill-main size-6 ml-2' />
            </div>
            <div className='absolute bottom-3 left-[-3rem]'>
              <Image
                src={planetIcon}
                width={100}
                height={100}
                alt=''
                className='hover:animate-bounce'
              />
            </div>
          </button>
        </Link>

        <div className='w-[84rem]'>
          <div className='bg-white rounded-[2rem] h-60 mb-3'>
            <div className='flex ml-8 mb-3'>
              <Image
                src={pinIcon}
                width={28}
                height={30}
                alt=''
                className='-scale-x-100 -rotate-12 mr-2'
              />
              <p className='text-xl text-highlight font-semibold'>
                내가 나온 연극
              </p>
            </div>
            <div className='flex justify-around'>
              {myVideos.map((value, key) => {
                return (
                  <div key={key}>
                    <div className='bg-gray-200 rounded-full w-32 h-32 mb-2'></div>
                    <div className='text-center'>{value}</div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className='flex justify-center h-72 mb-3'>
            <div className='bg-white rounded-[2rem] w-1/2 mr-1'>
              <div className='flex ml-8 mb-3'>
                <Image
                  src={pinIcon}
                  width={28}
                  height={30}
                  alt=''
                  className='-scale-x-100 -rotate-12 mr-2'
                />
                <p className='text-xl text-highlight font-semibold'>
                  다른 사람들의 연극 구경하기
                </p>
                <div>
                  {videos.map((value, key) => {
                    return (<div key={key}></div>)
                  })}
                </div>
              </div>
            </div>

            <div className='bg-white rounded-[2rem] w-1/2 ml-2'>
              <div className='flex ml-8 mb-3'>
                <Image
                  src={pinIcon}
                  width={28}
                  height={30}
                  alt=''
                  className='-scale-x-100 -rotate-12 mr-2'
                />
                <p className='text-xl text-highlight font-semibold'>
                  동화 대본 구경하기
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Link href="/login">
        로그인하기
      </Link>
      <Link href="/signup">
        회원가입
      </Link>
      <Link href="/newroom">
        방생성
      </Link>
      <div>
        {videos.map((item, index) => {
          return (
            <div key={index}>
              <Link href={`/video/${item}`}>open {item} video modal</Link>
            </div>
          );
        })}
      </div>
      <div>
        {scenarios.map((item, index) => {
          return (
            <div key={index}>
              <Link href={`/scenario/${item}`}>open {item} scenario modal</Link>
            </div>
          );
        })}
      </div> */}
    </main>
  )
}
