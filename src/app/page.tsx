'use client'

import Link from 'next/link'
import Image from 'next/image'
import planetIcon from '../../public/YellowPlanetIcon.png'
import pinIcon from '../../public/YellowPinIcon.png'

import { PlayIcon } from '@heroicons/react/24/solid'

// TODO : 데이터 삭제후 서버 데이터로 교체

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

const scripts = [
  '신데렐라',
  '아기돼지 삼형제',
  '백설공주',
  '헨젤과 그레텔',
  '공주와 개구리',
  '대본 이름',
]

export default function Page() {
  return (
    <main>
      <div className='flex justify-center px-12 md:px-24 lg:px-52'>
        <div className='grow flex flex-col items-center max-w-screen-xl h-screen'>
          <Link href='/newroom'>
            <button
              type='button'
              className='relative z-0 bg-white hover:bg-gray-100 rounded-[3rem] w-96 h-32 ml-20 my-10 shadow'
            >
              <div className='flex items-center ml-[4.5rem]'>
                <p className='text-3xl text-highlight font-extrabold'>
                  동화 속으로 떠나기
                </p>
                <PlayIcon className='fill-main size-6 ml-2' />
              </div>
              <div className='absolute bottom-3 left-[-5rem]'>
                <Image
                  src={planetIcon}
                  width={90}
                  height={90}
                  alt='방생성 버튼'
                  className='hover:animate-bounce'
                />
              </div>
            </button>
          </Link>

          <div className='w-full'>
            <div className='bg-white rounded-[2rem] h-[24rem] p-4 mb-4'>
              <div className='flex px-8 py-6 mb-1'>
                <Image
                  src={pinIcon}
                  width={24}
                  height={28}
                  alt="내가 나온 연극 목록"
                  className='-scale-x-100 -rotate-12 mr-2'
                />
                <p className='text-2xl text-highlight font-semibold pt-1'>
                  내가 나온 연극
                </p>
              </div>
              <div className='flex justify-around'>
                {myVideos.map((value, key) => {
                  return (
                    <div key={key}>
                      <div className='bg-gray-200 rounded-full w-52 h-52 mb-2'></div>
                      <div className='text-center'>{value}</div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className='flex justify-center h-[32rem] mb-4'>
              <div className='bg-white rounded-[2rem] w-1/2 p-4 mr-2'>
                <div className='flex px-8 py-4 mb-1'>
                  <Image
                    src={pinIcon}
                    width={24}
                    height={28}
                    alt='다른 사람들의 연극 구경하기'
                    className='-scale-x-100 -rotate-12 mr-2'
                  />
                  <p className='text-2xl text-highlight font-semibold pt-1'>
                    다른 사람들의 연극 구경하기
                  </p>
                </div>

                <div className='flex flex-wrap justify-center'>
                  {videos.map((value, key) => {
                    return (
                      <div key={key} className='w-64 mx-3 mb-4'>
                        <div className=' bg-gray-200 rounded-2xl h-40 mb-2'></div>
                        <div className='truncate text-center'>{`${value.title} | ${value.department}`}</div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className='bg-white rounded-[2rem] w-1/2 p-4 ml-2'>
                <div className='flex px-8 py-4 mb-1'>
                  <Image
                    src={pinIcon}
                    width={24}
                    height={28}
                    alt='동화 대본 구경하기'
                    className='-scale-x-100 -rotate-12 mr-2'
                  />
                  <p className='text-2xl text-highlight font-semibold pt-1'>
                    동화 대본 구경하기
                  </p>
                </div>

                <div className='flex flex-wrap justify-center'>
                  {scripts.map((value, key) => {
                    return (
                      <div key={key} className='w-64 mx-3 mb-4'>
                        <div className=' bg-gray-200 rounded-2xl h-40 mb-2'></div>
                        <div className='truncate text-center'>{value}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
