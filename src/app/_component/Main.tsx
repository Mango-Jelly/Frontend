'use client';

import ScriptList from './ScriptList'
import VideosOfOtherUser from './VideosOfOtherUser'
import MyVideos from './MyVideos'
import MakeRoomButton from './MakeRoomButton'
import { useState } from 'react'

export default function Main() {
    const [isLogin] = useState(true);
    return (
        <>
            <main className='flex justify-center px-12 md:px-24 lg:px-52'>
                <div className='grow flex flex-col items-center max-w-screen-xl'>
                    <MakeRoomButton isLogin={isLogin} />
                    <div className='w-full'>
                        <MyVideos isLogin={isLogin} />
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
