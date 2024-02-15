import BackgroundAnimation from './BackgroundAnimation';
import MakeRoomButton from './MakeRoomButton';
import MyVideos from './MyVideos';
import VideosOfOtherUser from './VideosOfOtherUser';
import ScriptList from './ScriptList';

import { auth } from '@/auth';

export default async function Main() {
  const session = await auth();

  return (
    <>
      <main
        className='flex justify-center overflow-hidden
        px-12 md:px-24 lg:px-52 relative'
      >
        <div className='absolute inset-0 z-0'>
          <BackgroundAnimation />
        </div>
        <div className='grow flex flex-col items-center max-w-screen-xl z-10'>

          <MakeRoomButton isLogin={session ? true : false} />
          <div className='w-full'>
            <MyVideos isLogin={session ? true : false} />
            <div className='flex justify-center mb-4'>
              <VideosOfOtherUser isLogin={session ? true : false} />
              <ScriptList />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
