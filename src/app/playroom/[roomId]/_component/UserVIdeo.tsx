'use client';
import React from 'react';
import OpenViduVideoComponent from './OvVideo';

type Props = {
  streamManager: any;
};

export default function UserVideoComponent({ streamManager }: Props) {
  const getNicknameTag = () => {
    // Gets the nickName of the user
    return JSON.parse(streamManager.stream.connection.data).clientData;
  };

  return (
    <div className='size-full'>
      {streamManager !== undefined ? (
        <div className='size-full'>
          <OpenViduVideoComponent streamManager={streamManager} />
          <p className='text-center text-xl mt-1'>{getNicknameTag()}</p>
        </div>
      ) : null}
    </div>
  );
}
