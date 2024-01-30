import './page.css'
import Image
 from 'next/image'
import  { useState } from 'react';
import VideoImage from '@/../public/VideoTag.svg'
import LeftArrow from '@/../public/LeftArrow.svg'
import RightArrow from '@/../public/RightArrow.svg'
import UserVideoComponent from './UserVIdeo'

type Props = {
    depart : string;
    title : string;
    subscribers : any[];
}

export default function GuestVideosSection(props : Props) {    
    const [currentIndex, setCurrentIndex] = useState(0);
    const maxItemsPerSlide : number = 5;
    const handlePrev = () => {
        
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
        console.log(currentIndex)
        };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex < props.subscribers.length - maxItemsPerSlide ? prevIndex + 1 : prevIndex));
        console.log(currentIndex)
        };


  return (
    <div className = "topcontainer">
        <div className='top-1/2 left-1/2 mx-auto text-center'>
            <p className='my-10 text-3xl'>{props.depart}의 {props.title}</p>

            
            <div className='flex flex-row w-8/9'>
                    <div className='mx-auto flex flex-row space-x-10  w-full '>
                    <Image alt = "왼쪽 화살표" src = {LeftArrow} onClick={handlePrev}/>
                    
                        <div className='flex flex-row space-x-4 overflow-x-hidden overflow-hidden w-full '>
                            {
                                props.subscribers.length !== 0 ? 
                                <div className=" carousel " style={{ left: `-${currentIndex * (100 / maxItemsPerSlide)}%` }}>
                                        {
                                        props.subscribers.map((event, id) => 
                                                ( typeof props.subscribers[0] === 'string' ?

                                                <video 
                                                className={`carousel-item ${id === currentIndex ? 'active' : ''} my-5 px-2 w-1/5`}
                                                controls muted>
                                                    <source src="https://mongo-jelly.s3.ap-northeast-2.amazonaws.com/frontSampleVideo.mp4" type="video/mp4" />
                                                </video> 

                                            :
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
