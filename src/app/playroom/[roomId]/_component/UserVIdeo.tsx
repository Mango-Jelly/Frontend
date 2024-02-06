'use client'
import React from 'react';
import OpenViduVideoComponent from './OvVideo';


type Props = {
    streamManager : any
  }

export default function UserVideoComponent({ streamManager } : Props) {

    const getNicknameTag = () => {
        // Gets the nickName of the user
        return JSON.parse(streamManager.stream.connection.data).clientData;
    }

    return (
        <div className='z-10 w-full'>
            {streamManager !== undefined ? (
                <div className="z-10 w-full">
                    <OpenViduVideoComponent streamManager={streamManager} />
                    <div><p>{getNicknameTag()}</p></div>
                </div>
            ) : null}
        </div>
    );
}