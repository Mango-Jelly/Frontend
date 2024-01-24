import ScriptList from './ScriptList'
import VideosOfOtherUser from './VideosOfOtherUser'
import MyVideos from './MyVideos'
import MakeRoomButton from './MakeRoomButton'

export default function Main() {
    return (
        <>
            <main className='flex justify-center px-12 md:px-24 lg:px-52'>
                <div className='grow flex flex-col items-center max-w-screen-xl'>
                    <MakeRoomButton />
                    <div className='w-full'>
                        <MyVideos />
                        <div className='flex justify-center h-[32rem] mb-4'>
                            <VideosOfOtherUser />
                            <ScriptList />
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
