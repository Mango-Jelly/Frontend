import Link from 'next/link'
import Image from 'next/image'
import planetIcon from '../../../public/YellowPlanetIcon.png'
import { PlayIcon } from '@heroicons/react/24/solid'


export default function MakeRoomButton() {
    return (
        <Link href='/newroom'>
            <button
                type='button'
                className='relative z-0 bg-white hover:bg-gray-100 rounded-[3rem] w-96 h-32 ml-20 my-10 shadow'
            >
                <div className='flex items-center ml-[4.5rem]'>
                    <p className='text-3xl text-highlight font-extrabold'>
                        동화 속으로 떠나기
                    </p>
                    <PlayIcon className='fill-main size-6 ml-2' />
                </div>
                <div className='absolute bottom-3 left-[-5rem]'>
                    <Image
                        src={planetIcon}
                        width={90}
                        height={90}
                        alt='방생성 버튼'
                        className='hover:animate-bounce'
                    />
                </div>
            </button>
        </Link>

    )
}
