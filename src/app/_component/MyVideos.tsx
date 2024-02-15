import Link from 'next/link';
import Image from 'next/image';
import pinIcon from '../../../public/YellowPinIcon.png';

import { getMyVideos } from '@/api/movie';
import { auth } from '@/auth';

interface MyVideo {
  videoId: number;
  title: string;
  urlThumbnail: string;
  department: string;
  isPublic: true;
}

export default async function MyVideos({ isLogin }: { isLogin: boolean }) {
  const session: any = await auth();
  let myVideos = [];

  if (isLogin) {
    try {
      const fetchedData = await getMyVideos(session.Authorization);
      myVideos = fetchedData.data.videos;
    } catch (error) {
      console.error('내 연극 리스트 가져오기 에러', error);
    }
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
        <p className='text-3xl text-highlight font-bold'>
          {isLogin ? '내가 나온 연극' : '이렇게 이용해보세요'}
        </p>
      </div>
      {isLogin && (
        <div className='flex justify-around my-2'>
          {myVideos.map((value: MyVideo, index: number) => {
            return (
              <div
                key={value.videoId}
                title={`${value.title} | ${value.department}`}
                className='rounded-3xl p-2 hover:bg-gray-100'
              >
                <Link
                  href={`/video/${value.videoId}`}
                  className='flex flex-col items-center'
                >
                  <Image
                    src={value.urlThumbnail}
                    width={300}
                    height={300}
                    alt={value.title}
                    className='rounded-full size-52 mb-2 object-cover'
                  ></Image>
                  <div className='truncate w-[18rem] text-xl font-medium text-center'>{`${value.title} | ${value.department}`}</div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
