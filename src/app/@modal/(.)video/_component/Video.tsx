import React from 'react';
import { Suspense } from 'react';
import VideoViewer from './VideoViewer';
import {
  ArrowDownTrayIcon,
  LockClosedIcon,
  LockOpenIcon,
} from '@heroicons/react/20/solid';
import BackButton from '@/app/_component/BackButton';

import { auth } from '@/auth';
import { getVideo } from '@/api/movie';
import { getVideoLoginUser } from '@/api/movie';

type Props = {
  id: number;
  isLogin: boolean;
};

export default async function Video({ id, isLogin }: Props) {
  let videoData;

  try {
    let fetchedData;
    if (isLogin) {
      const session: any = await auth();
      fetchedData = await getVideoLoginUser(id, session.Authorization);
    } else {
      fetchedData = await getVideo(id);
    }
    videoData = fetchedData.data.videos;
  } catch (error) {
    console.error('퍼블릭 비디오 가져오기 에러', error);
  }

  return (
    <div className='flex justify-center items-center size-full'>
      <BackButton />
      <div className='flex flex-col justify-center items-center bg-white/80 w-[30%] h-[88%] m-2'>
        <div className='bg-gray-200 rounded-full size-72'></div>
        <p className='text-3xl font-bold m-4'>{videoData.data.scriptName}</p>
        <div className='flex justify-center items-center text-xl bg-gray-200 rounded-3xl w-4/5 h-20 m-2'>
          {videoData.data.department}
        </div>
        <div className='flex justify-center items-center text-xl bg-gray-200 rounded-3xl w-4/5 h-20 m-2'>
          {videoData.data.createAt}
        </div>
        <div className='flex flex-col justify-center items-center text-xl bg-gray-200 rounded-3xl w-4/5 h-72 m-2'>
          {videoData.data.party.split('_').map((value, key) => {
            return <div key={key}>{`${value}\n`}</div>;
          })}
        </div>
      </div>

      <div className='flex flex-col justify-center items-center bg-white/80 w-[62%] h-[88%] m-2 p-12'>
        <div className='text-5xl mb-12 font-bold'>{videoData.data.title}</div>
        <div className='flex justify-end  w-full mb-8'>
          <ArrowDownTrayIcon className='size-8 mx-2' />
          {videoData.data.isPublic ? (
            <LockOpenIcon className='size-8 mx-2' />
          ) : (
            <LockClosedIcon className='size-8 mx-2' />
          )}
        </div>
        <div className='bg-gray-200 w-full h-[70%] rounded-3xl'>
          <Suspense fallback={<p>Loading video...</p>}>
            <VideoViewer />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
