import React from 'react'
import Image
 from 'next/image'
import piggie from '@/../public/piggie.svg'
import '../page.css'

import * as StompJs  from "@stomp/stompjs"

type Props = {
    client : StompJs.Client
    userId : string
    roomId : string
    role : string
  }
  

//   const message = {
//     code: 100,
//     id : USERID
//   };
//   // console.log(JSON.stringify(message))
//   client.current.publish({
//     destination: `/sub/channel/${roomId}`,
//     body: JSON.stringify(message),
//   });

export default function UserActionSection(Props : Props) {
    function Alert(alarm : number) {
        const message = {
                code: alarm,
                id : Props.userId
              };
        Props.client.publish({
            destination: `/sub/channel/${Props.roomId}`,
            body: JSON.stringify(message),
        })
    }
    
  return (
    <div className=' ml-[7rem] mr-[2rem] mt-[2rem] w-[60rem]' >
        <div className='flex flex-row h-[8rem]  my-[2rem] ml-[2rem] '> 
            <Image src={piggie}
                alt = '배역사진'
                className='h-[8rem] w-[8rem] object-cover mr-[6rem]'
            />
            <div className='inline-block my-auto mr-[6rem]' >
                <div className='inline-block '>
                    <h1 className='block text-4xl'>나의 역할은</h1>
                    {Props.role ? <h2 className='block text-5xl'> <strong className='text-6xl'>{Props.role}</strong>에요</h2> : <h2 className='block text-4xl'>아직 정해지지 않았어요</h2>}
                </div>
            </div>
            <div className=' h-[8rem] block relative '>
                <div id = "rightbox" className='flex flex-row absolute bottom-0 z-2'>
                    <button type="button" className="w-[7rem] h-[4rem] text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">Yellow</button>
                    <button type="button" className=" w-[7rem] h-[4rem] text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">Yellow</button>
                </div>
            </div>
        </div>

        <div className='grid grid-cols-2 gap-[1rem] mu-[2rem] h-[35rem] w-[55rem]'>

        <div onClick = {() => Alert(201)}  className=' hover:bg-gray-300  flex flex-col justify-center items-center h-[calc(50% - 1rem)] default-component-color ml-[0.5rem] mt-[0.5rem] rounded-[2rem]'>
            <p className='text-5xl w-[20rem] wrap text-center'>선생님</p>
            <p className='text-5xl w-[20rem] wrap text-center'>할 말 있어요</p>
        </div>
        <div onClick = {() => Alert(202)} className='  hover:bg-gray-300 flex flex-col justify-center items-center h-[calc(50% - 1rem)] default-component-color ml-[0.5rem] mt-[0.5rem] rounded-[2rem]'>
            <p className='text-5xl w-[20rem] wrap text-center'>화장실에 </p>
            <p className='text-5xl w-[20rem] wrap text-center'>가고 싶어요</p>
        </div>
        <div onClick = {() => Alert(203)} className='  hover:bg-gray-300 flex flex-col justify-center items-center h-[calc(50% - 1rem)] default-component-color ml-[0.5rem] mt-[0.5rem] rounded-[2rem]'>
            <p className='text-5xl w-[20rem] wrap text-center'>저는</p>
            <p className='text-5xl w-[20rem] wrap text-center'>준비됐어요</p>
        </div>
        <div onClick = {() => Alert(204)} className='  hover:bg-gray-300 flex flex-col justify-center items-center h-[calc(50% - 1rem)] default-component-color ml-[0.5rem] mt-[0.5rem] rounded-[2rem]'>
            <p className='text-5xl w-[20rem] wrap text-center'>응급 상황! </p>
            <p className='text-5xl w-[20rem] wrap text-center'>확인해 주세요</p>
        </div>
        </div>
    </div>
  )
}
