'use client'

import Link from 'next/link'
import Image from 'next/image'
import planetIcon from '../../public/YellowPlanetIcon.png'
import pinIcon from '../../public/YellowPinIcon.png'
import { myVideos, publicVideos, scripts } from '../app/_component/DummyData'

import { PlayIcon } from '@heroicons/react/24/solid'

// const videos = [1, 2, 3]
// const scenarios = [1, 2, 3]

export default function Page() {
  return (
    <main>
      <div className='flex justify-center px-12 md:px-24 lg:px-52'>
        <div className='grow flex flex-col items-center max-w-screen-xl'>
          <Link href='/newroom'>
            <button
              type='button'
              className='relative bg-white hover:bg-gray-100 rounded-[3rem] w-96 h-32 ml-20 my-10 shadow'
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
                  alt=''
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
                  alt=''
                  className='-scale-x-100 -rotate-12 mr-2'
                />
                <p className='text-2xl text-highlight font-semibold pt-1'>
                  내가 나온 연극
                </p>
              </div>
              <div className='flex justify-around'>
                {myVideos.map((value, key) => {
                  return (
                    <div key={key} className='rounded-xl p-2 hover:bg-gray-100'>
                      <Link href={`/video/${value.videoId}`}>
                        <div className='bg-gray-200 rounded-full w-52 h-52 mb-2'></div>
                        <div className='text-center'>{value.title}</div>
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className='flex justify-center h-[32rem] mb-4'>
              <div className='bg-white rounded-[2rem] w-1/2 h-auto p-4 mr-2'>
                <div className='flex px-8 py-4 mb-1'>
                  <Image
                    src={pinIcon}
                    width={24}
                    height={28}
                    alt=''
                    className='-scale-x-100 -rotate-12 mr-2'
                  />
                  <p className='text-2xl text-highlight font-semibold pt-1'>
                    다른 사람들의 연극 구경하기
                  </p>
                </div>

                <div className='flex flex-wrap justify-center'>
                  {publicVideos.map((value, key) => {
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
                    alt=''
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
                        <div className='truncate text-center'>
                          {value.title}
                        </div>
                      </div>
                    )
                  })}
                </div>
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
