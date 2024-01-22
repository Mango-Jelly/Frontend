import './page.css'
import Image
 from 'next/image'
import React from 'react'
import VideoImage from '@/../public/VideoTag.svg'
import LeftArrow from '@/../public/LeftArrow.svg'
import RightArrow from '@/../public/RightArrow.svg'
// import VideoImage from './VideoTag.svg'

type Props = {
    depart : string;
    title : string;
}

export default function top(props : Props) {


  return (
    <div className = "topcontainer">
        {/* <Image src = {VideoImage} /> */}
        <div className='top-1/2 left-1/2 mx-auto text-center'>
            <p className='my-10 text-3xl'>{props.depart}의 {props.title}</p>
                        

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

        </div>

    </div>
  )
}
