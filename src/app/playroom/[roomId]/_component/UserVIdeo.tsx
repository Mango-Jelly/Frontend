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
        <div>
            {streamManager !== undefined ? (
                <div className="">
                    <OpenViduVideoComponent streamManager={streamManager} />
                    <div><p>{getNicknameTag()}</p></div>
                </div>
            ) : null}
        </div>
    );
}