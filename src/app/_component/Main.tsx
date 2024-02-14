import ScriptList from './ScriptList';
import VideosOfOtherUser from './VideosOfOtherUser';
import MyVideos from './MyVideos';
import MakeRoomButton from './MakeRoomButton';
import { auth } from '@/auth';

export default async function Main() {
    const session = await auth();
    return (
        <>
            <main className='flex justify-center px-12 md:px-24 lg:px-52'>
                <div className='grow flex flex-col items-center max-w-screen-xl'>
                    <MakeRoomButton isLogin={session ? true : false} />
                    <div className='w-full'>
                        <MyVideos isLogin={session ? true : false} />
                        <div className='flex justify-center mb-4'>
                            <VideosOfOtherUser />
                            <ScriptList />
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
