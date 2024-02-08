import Link from 'next/link';
import Image from 'next/image';
import pinIcon from '../../../public/YellowPinIcon.png';

import { myVideos } from '../../data/Dummy';
import { getMyVideos } from '@/api/movie';
import { auth } from '@/auth';

interface MyVideo {
  videoId: number;
  title: string;
  thumbnail: string;
}

export default async function MyVideos({ isLogin }: { isLogin: boolean }) {
  const { Authrization } = await auth();
  let myVideos = [];

  try {
    const fetchedData = await getMyVideos(Authrization);
    myVideos = fetchedData.data.videos;
  } catch (error) {
    console.error('내 연극 리스트 가져오기 에러', error);
  }

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
          {myVideos.map((value: MyVideo) => {
            return (
              <div
                key={value.videoId}
                className='rounded-3xl p-2 hover:bg-gray-100'
              >
                <Link href={`/video/${value.videoId}`}>
                  <Image
                    src={value.thumbnail}
                    width={300}
                    height={300}
                    alt={value.title}
                    className='rounded-full size-52 mb-2'
                  ></Image>
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
