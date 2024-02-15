import Link from 'next/link';
import Image from 'next/image';
import planetIcon from '../../../public/YellowPlanetIcon.png';
import img_maincloud1 from '@/../public/img_maincloud1.png';
import img_maincloud2 from '@/../public/img_maincloud2.png';
import { PlayIcon } from '@heroicons/react/24/solid';

export default function MakeRoomButton({ isLogin }: { isLogin: boolean }) {
  return (
    <div className='group'>
      <Link href={isLogin ? '/newroom' : '/login'}>
        <button
          type='button'
          className='relative z-0 bg-white hover:bg-gray-100 rounded-[4rem] w-auto h-32 ml-20 my-10 shadow'
        >
          <div className='flex items-center ml-20 mr-8'>
            <p className='text-4xl text-highlight font-extrabold'>
              {isLogin ? '동화 속으로 떠나기' : '로그인하고 떠나자!'}
            </p>
            <PlayIcon className='fill-main size-6 ml-2' />
          </div>
          <div className='absolute bottom-3 left-[-4.5rem] group-hover:animate-bounce'>
            <Image
              src={planetIcon}
              width={90}
              height={90}
              alt='방 생성 버튼'
              className=''
            />
          </div>
        </button>
      </Link>
      <div>
        <Image
          src={img_maincloud1}
          width={616}
          height={377}
          alt='메인페이지'
          className='absolute left-[32rem] w-[30rem] -z-[10] group-hover:animate-fastYMovement-1s'
        />
        <Image
          src={img_maincloud2}
          width={574}
          height={329}
          alt='메인페이지'
          className='absolute right-[29rem] w-[30rem] -z-[10] group-hover:animate-fastYMovement-1s'
        />
      </div>
    </div>
  );
}
