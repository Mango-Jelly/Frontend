import './page.css'
import Image
 from 'next/image'
import  { useEffect, useState } from 'react';
import VideoImage from '@/../public/VideoTag.svg'
import LeftArrow from '@/../public/LeftArrow.svg'
import RightArrow from '@/../public/RightArrow.svg'
import UserVideoComponent from './UserVIdeo'
import { OpenVidu, Stream, Subscriber } from 'openvidu-browser';


type CameraUnit = {
    userId : string
    Subscriber : Subscriber
}


type UserStatus = {
    name: string
    status: number
    role : string
    camera : Subscriber | null
  }

  
type Props = {
    depart : string;
    title : string;
    call : string;
    ENTRY : UserStatus[]
}



// 요청때마다 정렬 순서가 바뀌고 여기선 1회성이니까 안해도 될수도 방금 저기서는 상태가 저장되어있어야하니까 그랬는데 여기선 지금 말하거나 문제가 생겼다는 놈들의 카메라만 앞에 세워주면됨

export default function GuestVideosSection(props : Props) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const [call, setCall] = useState(props.call);
    const maxItemsPerSlide : number = 5;
    const handlePrev = () => {
        
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
        console.log(currentIndex)
        };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex < props.ENTRY.length - maxItemsPerSlide ? prevIndex + 1 : prevIndex));
        console.log(currentIndex)
        };
    




    return (
    <div className = "topcontainer">
        <div className='top-1/2 left-1/2 mx-auto text-center w-full'>
            <p className=' text-3xl w-full'>{props.depart}의 {props.title}</p>

            
            <div className='flex flex-row w-8/9'>
                    <div className='mx-auto flex flex-row space-x-10  w-full  '>
                    <Image alt = "왼쪽 화살표" src = {LeftArrow} onClick={handlePrev} className='w-1/18'/>
                    
                        <div className='flex flex-row space-x-4 overflow-x-hidden overflow-hidden w-full h-full'>
                            {
                                props.ENTRY.length > 0 ?
                                <div className=" carousel" style={{ left: `-${currentIndex * (100 / maxItemsPerSlide)}%` }}>
                                        {
                                        props.ENTRY.map((event, id) =>
                                                ( 


                                                    <div className='w-1/5 h-full p-3' key = {id}>

                                                    { event.camera ? 
                                                        <div className=''>
                                                            <UserVideoComponent
                                                            key = {id}
                                                            streamManager={event.camera}
                                                            />
                                                        </div>
                                                        :
                                                        <Image src={VideoImage} className="w-full h-full rounded" alt="..."/>}
                                                    </div>
                                                )
                                            )
                                        }
                                </div>
                            :
                                <div className='mx-auto flex flex-row space-x-10  w-full '>
                                <Image src={VideoImage} className="max-w-96 rounded" alt="..."/>
                                <Image src={VideoImage} className="max-w-96 rounded" alt="..."/>
                                <Image src={VideoImage} className="max-w-96 rounded" alt="..."/>
                                <Image src={VideoImage} className="max-w-96 rounded" alt="..."/>
                                </div>
                        }
                    </div>
                <Image src = {RightArrow} alt = "오른쪽 화살표" onClick={handleNext} className='w-1/18'/>
                </div>
            </div>
        </div>
    </div>
  )
}
