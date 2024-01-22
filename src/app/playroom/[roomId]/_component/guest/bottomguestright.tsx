import React from 'react'
import Image
 from 'next/image'
import piggie from '@/../public/piggie.svg'
import '../page.css'

export default function bottomguestright() {
  return (
    <div className=' ml-[7rem] mr-[2rem] mt-[2rem] w-[60rem]' >
        <div className='flex flex-row h-[8rem]  my-[2rem] ml-[2rem] '> 
            <Image src={piggie}
                className='h-[8rem] w-[8rem] object-cover mr-[6rem]'
            />
            <div className='inline-block my-auto mr-[6rem]' >
                <div className='inline-block '>
                    <h1 className='block text-4xl'>나의 역할은</h1>
                    <h2 className='block text-5xl'><strong className='text-6xl'>돼지쌔끼</strong>에요</h2>
                </div>
            </div>
            <div className=' h-[8rem] block relative '>
                <div id = "rightbox" className='flex flex-row absolute bottom-0 z-2'>
                    <button type="button" className="w-[7rem] h-[4rem] text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">Yellow</button>
                    <button type="button" className=" w-[7rem] h-[4rem] text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">Yellow</button>
                </div>
            </div>
        </div>
        

        {/* <div className='grid grid-cols-2 mu-[2rem] h-[40rem] '>
            <div >
                <p className='h-1/2 default-component-color  ml-[0.5rem] mt-[0.5rem] rounded-[2rem] relative'>
                    
                    <p className='absolute bottom-50 bottom-[10rem]'>선생님 할 말 있어요</p>
                
                </p>
                <p className='h-1/2 default-component-color ml-[0.5rem] mt-[0.5rem]  rounded-[2rem]'>화장실에 가고 싶어요</p>
            </div>
            <div >
                <p className='h-1/2 default-component-color ml-[0.5rem] mt-[0.5rem]  rounded-[2rem]'>저는 준비됐어요</p>
                <p className='h-1/2 default-component-color ml-[0.5rem] mt-[0.5rem]  rounded-[2rem]'>응급 상황! 확인해 주세요</p>
            </div>
        </div> */}
        {/* <div className='grid grid-cols-2 mu-[2rem] h-[40rem] '>
            <div className='flex justify-center items-center h-1/2 default-component-color ml-[0.5rem] mt-[0.5rem] rounded-[2rem] relative'>
                <p >선생님 할 말 있어요</p>
            </div>
            <div className='flex justify-center items-center h-1/2 default-component-color ml-[0.5rem] mt-[0.5rem]  rounded-[2rem]'>
                <p>화장실에 가고 싶어요</p>
            </div>
            <div className='flex justify-center items-center h-1/2 default-component-color ml-[0.5rem] mt-[0.5rem]  rounded-[2rem]'>
                <p>저는 준비됐어요</p>
            </div>
            <div className='flex justify-center items-center h-1/2 default-component-color ml-[0.5rem] mt-[0.5rem]  rounded-[2rem]'>
                <p>응급 상황! 확인해 주세요</p>
            </div>
        </div> */}

        {/* <div className='grid grid-cols-2 gap-[2rem] mu-[2rem] h-[40rem]'>
            <div className='flex justify-center items-center h-[calc(50% - 1rem)] default-component-color ml-[0.5rem] mt-[0.5rem] rounded-[2rem] relative'>
                <p className=' text-5xl w-[151  rem] wrap'>선생님</p>
                <p className=' text-5xl w-[151  rem] wrap'>할 말 있어요</p>
            </div>
            <div className='flex justify-center items-center h-[calc(50% - 1rem)] default-component-color ml-[0.5rem] mt-[0.5rem] rounded-[2rem]'>
                <p>화장실에 가고 싶어요</p>
            </div>
            <div className='flex justify-center items-center h-[calc(50% - 1rem)] default-component-color ml-[0.5rem] mt-[0.5rem] rounded-[2rem]'>
                <p>저는 준비됐어요</p>
            </div>
            <div className='flex justify-center items-center h-[calc(50% - 1rem)] default-component-color ml-[0.5rem] mt-[0.5rem] rounded-[2rem]'>
                <p>응급 상황! 확인해 주세요</p>
            </div>
        </div> */}

        <div className='grid grid-cols-2 gap-[1rem] mu-[2rem] h-[35rem] w-[55rem]'>

        <div className='flex flex-col justify-center items-center h-[calc(50% - 1rem)] default-component-color ml-[0.5rem] mt-[0.5rem] rounded-[2rem]'>
            <p className='text-5xl w-[20rem] wrap text-center'>선생님</p>
            <p className='text-5xl w-[20rem] wrap text-center'>할 말 있어요</p>
        </div>
        <div className='flex flex-col justify-center items-center h-[calc(50% - 1rem)] default-component-color ml-[0.5rem] mt-[0.5rem] rounded-[2rem]'>
            <p className='text-5xl w-[20rem] wrap text-center'>화장실에 </p>
            <p className='text-5xl w-[20rem] wrap text-center'>가고 싶어요</p>
        </div>
        <div className='flex flex-col justify-center items-center h-[calc(50% - 1rem)] default-component-color ml-[0.5rem] mt-[0.5rem] rounded-[2rem]'>
            <p className='text-5xl w-[20rem] wrap text-center'>저는</p>
            <p className='text-5xl w-[20rem] wrap text-center'>준비됐어요</p>
        </div>
        <div className='flex flex-col justify-center items-center h-[calc(50% - 1rem)] default-component-color ml-[0.5rem] mt-[0.5rem] rounded-[2rem]'>
            <p className='text-5xl w-[20rem] wrap text-center'>응급 상황! </p>
            <p className='text-5xl w-[20rem] wrap text-center'>확인해 주세요</p>
        </div>
        </div>
    </div>
  )
}
