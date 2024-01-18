import React from 'react'
import Image
 from 'next/image'
import piggie from '@/../public/piggie.svg'


export default function bottomguestright() {
  return (
    <div>
        <div className='flex flex-row'> 
            <Image src={piggie}/>
            
            <div>
                <h1>나의 역할은</h1>
                <h2><strong>돼지쌔끼</strong>에요</h2>
            </div>
            <div className='flex align-bottom'>
                <div id = "rightbox" className='flex flex-row'>
                    <button type="button" className="max-h-10 text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">Yellow</button>
                <button type="button" className=" max-h-10 text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">Yellow</button>
                </div>
            </div>
        </div>
        <div className='grid grid-cols-2 h-4/5 '>
            <div >
                <p className='h-1/2 bg-gray-200 m-3 rounded-md'>선생님 할 말 있어요</p>
                <p className='h-1/2 bg-gray-200 m-3 rounded-md'>화장실에 가고 싶어요</p>
            </div>
            <div >
                <p className='h-1/2 bg-gray-200 m-3 rounded-md'>저는 준비됐어요</p>
                <p className='h-1/2 bg-gray-200 m-3 rounded-md'>응급 상황! 확인해 주세요</p>
            </div>
        </div>
    </div>
  )
}
