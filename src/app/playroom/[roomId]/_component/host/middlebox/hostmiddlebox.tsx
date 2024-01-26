import Image
 from 'next/image'
import React from 'react'
import VideoImage from '@/../public/VideoTag.svg'
import UserVideoComponent from '../../UserVIdeo'


type Props = {
  streamManager : any
}

export default function hostmiddlebox(Props : Props) {
  console.log(Props.streamManager)
  return (
    <div className='col-span-3 '>
        <div className='w-11/12 mx-auto'>

            {
              <UserVideoComponent 
              streamManager={Props.streamManager}
              />
            }

            <div className='flex justify-between'>
                <div id = "leftbox" className='flex flex-row'>
                <button type="button" className="h-14
                 text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">Yellow</button>
                <button type="button" className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">Yellow</button>
                </div>

                <div id = "rightbox" className='flex flex-row '>
                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-xl px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">종료하기</button>
                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-xl px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">시작하기</button>
                </div>
            </div>
        </div>
    </div>
  )
}
