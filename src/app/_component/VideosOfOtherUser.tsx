import { publicVideos } from './DummyData'
import pinIcon from '../../../public/YellowPinIcon.png'
import Image from 'next/image'

//TODO : 다른 사람들의 연극 구경하기 API 연결

export default function VideosOfOtherUser() {
    return (
        <div className='bg-white rounded-[2rem] w-1/2 h-auto p-4 mr-2'>
            <div className='flex px-8 py-4 mb-1'>
                <Image
                    src={pinIcon}
                    width={24}
                    height={28}
                    alt='다른 사람들의 연극 구경하기'
                    className='-scale-x-100 -rotate-12 mr-2'
                />
                <p className='text-2xl text-highlight font-semibold pt-1'>
                    다른 사람들의 연극 구경하기
                </p>
            </div>

            <div className='flex flex-wrap justify-center'>
                {publicVideos.map((value, key) => {
                    return (
                        <div key={key} className='w-64 mx-3 mb-4'>
                            <div className=' bg-gray-200 rounded-2xl h-40 mb-2'></div>
                            <div className='truncate text-center'>{`${value.title} | ${value.department}`}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
