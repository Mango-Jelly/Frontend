'use client';

import { useState } from 'react';

import GuestVideo from './GuestVideo';
import NicknameInput from './NicknameInput';
import SubmitButton from './SubmitButton';
import VideoControlButtons from './VideoControlButtons';

export default function GuestSettings() {
  const [nickname, setNickname] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isCameraOn, setCameraOn] = useState(true);
  const [isAudioOn, setAudioOn] = useState(true);

  return (
    <div className='flex justify-center m-48'>
      <GuestVideo isCameraOn={isCameraOn} />
      <div
        className='flex flex-col justify-between items-end
      rounded-2xl border-4 border-dashed border-mainsky
      h-[44rem] px-8 py-12 ml-8'
      >
        <div className='grid grid-cols-1 gap-12'>
          <NicknameInput
            nickname={nickname}
            setNickname={setNickname}
            isValid={isValid}
            setIsValid={setIsValid}
          />
          <VideoControlButtons
            isCameraOn={isCameraOn}
            setCameraOn={setCameraOn}
            isAudioOn={isAudioOn}
            setAudioOn={setAudioOn}
          />
        </div>
        <SubmitButton nickname={nickname} isValid={isValid} />
      </div>
    </div>
  );
}
