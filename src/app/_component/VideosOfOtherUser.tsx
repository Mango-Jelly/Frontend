import Link from 'next/link';
import Image from 'next/image';
import pinIcon from '../../../public/YellowPinIcon.png';

import { getPublicVideos } from '@/api/movie';

interface PublicVideo {
  videoId: number;
  title: string;
  urlThumbnail: string;
  department: string;
  isPublic: boolean;
}

export default async function VideosOfOtherUser({
  isLogin,
}: {
  isLogin: boolean;
}) {
  let publicVideos = [];

  try {
    const fetchedData = await getPublicVideos();
    publicVideos = fetchedData.data.videos;
  } catch (error) {
    console.error('다른 사람 연극 리스트 가져오기 에러', error);
  }

  return (
    <div className='bg-white rounded-[2rem] w-1/2 p-4 mr-2 h-full'>
      <div className='flex px-8 py-2'>
        <Image
          src={pinIcon}
          width={24}
          height={28}
          alt='다른 사람들의 연극 구경하기'
          className='-scale-x-100 -rotate-12 mr-4'
        />
        <p className='text-3xl text-highlight font-bold'>
          다른 사람들의 연극 구경하기
        </p>
      </div>

      <div className='flex flex-wrap justify-evenly h-auto mt-4'>
        {publicVideos.map((value: PublicVideo) => {
          return (
            <Link
              href={{
                pathname: `/video/${value.videoId}`,
                query: { isLogin: isLogin },
              }}
              as={`/video/${value.videoId}`}
              key={value.videoId}
            >
              <div
                className='w-[17rem] rounded-2xl p-2 hover:bg-gray-100 cursor-pointer'
                title={`${value.title} | ${value.department}`}
              >
                <Image
                  src={value.urlThumbnail}
                  width={300}
                  height={300}
                  alt={value.title}
                  className='rounded-2xl h-40 mb-2'
                ></Image>
                <div className='truncate text-lg text-center'>{`${value.title} | ${value.department}`}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
