import React from 'react';
import { Suspense } from 'react';
import Image from 'next/image';
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
  let videoData: any = null;

  try {
    let fetchedData;
    if (isLogin) {
      const session: any = await auth();
      fetchedData = await getVideoLoginUser(id, session.Authorization);
    } else {
      fetchedData = await getVideo(id);
    }
    videoData = fetchedData.data;
  } catch (error) {
    console.error('퍼블릭 비디오 가져오기 에러', error);
  }

  const infoBoxClass =
    'flex justify-center items-center bg-gray-100 rounded-3xl border-mainsky border-4 border-dashed w-4/5 m-2';

  function clickGo() {
    if (videoData !== null) {
      const b = document.createElement('a');
      b.href = videoData.videoAddress;
      b.download = 'tnmp';
      b.click();
    }
  }

  return (
    <div className='flex justify-center items-center size-full'>
      <BackButton />
      <div className='flex flex-col justify-center items-center bg-white/80 w-[30%] h-[88%] m-2 z-20'>
        <Image
          src={videoData.urlThumbnail}
          width={300}
          height={300}
          alt=''
          className='rounded-full size-72 object-cover'
        />
        <p className='text-3xl font-bold m-5'>{videoData.scriptName}</p>
        <div className='flex justify-center items-center text-3xl bg-gray-100 rounded-3xl border-mainsky border-4 border-dashed w-4/5 h-20 m-2'>
          {videoData.department}
        </div>
        <div className='flex justify-center items-center text-3xl bg-gray-100 rounded-3xl border-mainsky border-4 border-dashed w-4/5 h-20 m-2'>
          {/* {videoData.createAt} */}
          2024년 2월 14일
        </div>
        <div className='flex flex-col justify-center items-center bg-gray-100 rounded-3xl border-mainsky border-4 border-dashed w-4/5 h-72 m-2'>
          <div className='text-3xl font-semibod bg-main/40 mb-4'>배우 이름</div>
          {videoData.party.map((value: string, key: number) => {
            return <div key={key} className='text-2xl'>{`${value}\n`}</div>;
          })}
        </div>
      </div>

      <div className='flex flex-col justify-center items-center bg-white/80 w-[62%] h-[88%] m-2 p-12 z-20'>
        <div className='text-5xl mb-12 font-bold underline decoration-wavy decoration-main decoration-4 underline-offset-4'>
          {videoData.title}
        </div>
        <div className='flex justify-end  w-full mb-8'>
          {videoData.isPublic ? (
            <LockOpenIcon className='size-12 p-2' />
          ) : (
            <LockClosedIcon className='size-12 p-2' />
          )}
          <ArrowDownTrayIcon
            className='size-12 rounded-full p-2 hover:bg-gray-200'
            onClick={clickGo}
          />
        </div>
        <div className='bg-gray-200 w-full h-[70%] rounded-3xl'>
          <Suspense fallback={<p>Loading video...</p>}>
            <VideoViewer address={videoData.videoAddress} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
