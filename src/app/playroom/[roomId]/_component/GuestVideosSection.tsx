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
    subscribers : CameraUnit[];
}



// 요청때마다 정렬 순서가 바뀌고 여기선 1회성이니까 안해도 될수도 방금 저기서는 상태가 저장되어있어야하니까 그랬는데 여기선 지금 말하거나 문제가 생겼다는 놈들의 카메라만 앞에 세워주면됨

export default function GuestVideosSection(props : Props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [subscribers, setSubscribers] = useState(props.subscribers)
    const [call, setCall] = useState(props.call);
    const maxItemsPerSlide : number = 5;
    const handlePrev = () => {
        
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
        console.log(currentIndex)
        };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex < props.subscribers.length - maxItemsPerSlide ? prevIndex + 1 : prevIndex));
        console.log(currentIndex)
        };
    
    // useEffect(function () {
    //     console.log(props.call)
    //     if (typeof subscribers[0] === 'string') {
    //         setSubscribers((prevsub) => {
    //             let newsub = prevsub
    //             newsub = prevsub.find(props.call) + prevsub.filter(e => { return e != call })
    //             return newsub
    //         })
    //     }
    // } , [props.call])
    
    return (
    <div className = "topcontainer">
        <div className='top-1/2 left-1/2 mx-auto text-center'>
            <p className='my-10 text-3xl'>{props.depart}의 {props.title}</p>

            
            <div className='flex flex-row w-8/9'>
                    <div className='mx-auto flex flex-row space-x-10  w-full '>
                    <Image alt = "왼쪽 화살표" src = {LeftArrow} onClick={handlePrev}/>
                    
                        <div className='flex flex-row space-x-4 overflow-x-hidden overflow-hidden w-full '>
                            {
                                props.subscribers.length > 0 ?
                                <div className=" carousel " style={{ left: `-${currentIndex * (100 / maxItemsPerSlide)}%` }}>
                                        {
                                        props.ENTRY.map((event, id) =>
                                                ( typeof props.ENTRY[0] === 'string' ?
                                            <div
                                                key={id}
                                                className ={`${id === currentIndex ? 'active' : ''} my-5 px-2 w-1/5`}
                                                >
                                                <video
                                                controls muted>
                                                    <source src="https://mongo-jelly.s3.ap-northeast-2.amazonaws.com/frontSampleVideo.mp4" type="video/mp4" />
                                                </video>
                                                <p className = {`w-full text-wrap`}
                                                >{event.name}</p>
                                            </div>
                                            
                                            //     <video
                                            //     className ={` ${id === currentIndex ? 'active' : ''}  my-5 px-2 w-1/5`}
                                            //     controls muted>
                                            //         <source src="https://mongo-jelly.s3.ap-northeast-2.amazonaws.com/frontSampleVideo.mp4" type="video/mp4" />
                                            //     </video>
                                            :
                                                event.camera ? 
                                                <div
                                                    key = {id}
                                                    className='border-solid border-2 mx-[1rem] w-[35rem]'>
                                                    <UserVideoComponent
                                                    key = {id}
                                                    streamManager={event.camera}
                                                    />
                                                </div> 
                                                :
                                                <Image src={VideoImage} className="max-w-96 rounded" alt="..."/>

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
                <Image src = {RightArrow} alt = "오른쪽 화살표" onClick={handleNext}/>
                </div>
            </div>
        </div>
    </div>
  )
}
