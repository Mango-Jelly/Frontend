import Link from 'next/link';
import Image from 'next/image';
import pinIcon from '../../../public/YellowPinIcon.png';
import { myVideos } from '../../data/Dummy';

// TODO : 내가 나온 연극 API 연결
export default function MyVideos({ isLogin }: { isLogin: boolean }) {
  return (
    <div className='bg-white rounded-[2rem] h-[22rem] p-4 mb-4'>
      <div className='flex px-8 py-2'>
        <Image
          src={pinIcon}
          width={24}
          height={28}
          alt='내가 나온 연극 목록'
          className='-scale-x-100 -rotate-12 mr-4'
        />
        <p className='text-3xl text-highlight font-semibold'>
          {isLogin ? '내가 나온 연극' : '이렇게 이용해보세요'}
        </p>
      </div>
      {isLogin && (
        <div className='flex justify-around my-2'>
          {myVideos.map((value, key) => {
            return (
              <div key={key} className='rounded-3xl p-2 hover:bg-gray-100'>
                <Link href={`/video/${value.videoId}`}>
                  <div className='bg-gray-200 rounded-full size-52 mb-2'></div>
                  <div className='text-lg text-center'>{value.title}</div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
