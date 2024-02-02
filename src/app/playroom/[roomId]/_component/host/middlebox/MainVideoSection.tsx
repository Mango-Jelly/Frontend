import React from 'react'
import UserVideoComponent from '../../UserVIdeo'
import * as StompJs  from "@stomp/stompjs"

type Props = {
  streamManager : any
  roomId : string
  client : StompJs.Client
}

export default function MainVideoSection(Props : Props) {
  function Start() {
    const message = {
            code: 400,
          };
    Props.client.publish({
        destination: `/sub/channel/${Props.roomId}`,
        body: JSON.stringify(message),
    })
}
  // console.log(Props.streamManager)
  return (
    <div className='col-span-3 '>
        <div className='w-11/12 mx-auto h-full flex flex-col justify-between'>

            { Props.streamManager ? 
              <UserVideoComponent 
              streamManager={Props.streamManager}
              />
              :
              <div className='mx-auto my-5 h-full'>
                <video controls muted className='h-full'>
                  <source src="https://mongo-jelly.s3.ap-northeast-2.amazonaws.com/frontSampleVideo.mp4" type="video/mp4" />
                </video>
              </div>
            }

            <div className='flex justify-between'>
                <div id = "leftbox" className='flex flex-row'>
                <button type="button" className="h-14
                 text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">Yellow</button>
                <button type="button" className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">Yellow</button>
                </div>
                <div id = "rightbox" className='flex flex-row '>
                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:bg-blue-800 font-medium rounded-full text-xl px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:bg-blue-800">종료하기</button>
                    <button type="button" onClick = {Start} className="text-white bg-blue-700 hover:bg-blue-800 focus:bg-blue-800 font-medium rounded-full text-xl px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:bg-blue-800">시작하기</button>
                </div>
            </div>
        </div>
    </div>
  )
}
