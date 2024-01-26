import './page.css'
import Image
 from 'next/image'
import React from 'react'
import VideoImage from '@/../public/VideoTag.svg'
import LeftArrow from '@/../public/LeftArrow.svg'
import RightArrow from '@/../public/RightArrow.svg'
import UserVideoComponent from './UserVIdeo'
// import VideoImage from './VideoTag.svg'

type Props = {
    depart : string;
    title : string;
    subscribers : any[];
}

export default function top(props : Props) {    


  return (
    <div className = "topcontainer">
        {/* <Image src = {VideoImage} /> */}
        <div className='top-1/2 left-1/2 mx-auto text-center'>
            <p className='my-10 text-3xl'>{props.depart}의 {props.title}</p>
                        

            {
                props.subscribers !== undefined ? 
            null
            :

            <div className='flex flex-row  '>
                <div className='mx-auto flex flex-row space-x-10'>
                <Image alt = "왼쪽 화살표" src = {LeftArrow} />
                <div className='flex flex-row space-x-4'>
                    <Image src={VideoImage} className="max-w-96 rounded" alt="..."/>
                    <Image src={VideoImage} className="max-w-96 rounded" alt="..."/>
                    <Image src={VideoImage} className="max-w-96 rounded" alt="..."/>
                    <Image src={VideoImage} className="max-w-96 rounded" alt="..."/>

                </div>
                <Image src = {RightArrow} alt = "오른쪽 화살표"/>
                </div>
            </div>
            }

            {
                props.subscribers === undefined || props.subscribers.length === 0 ?
            null
            :
                <div className=' relative w-full overflow-x-auto  '>
                    <div className="overflow-hidden min-w-max flex">
                            {
                            props.subscribers.map((event, id) => 
                                (
                                    <div
                                    key = {id}
                                    className='border-solid border-2 mx-[1rem] w-[35rem]'>
                                    <UserVideoComponent 
                                    key = {id}
                                    streamManager={event}
                                    />
                                    </div>
                                )
                            )
                            }
                    </div>
                </div>
            }
        </div>

    </div>
  )
}
