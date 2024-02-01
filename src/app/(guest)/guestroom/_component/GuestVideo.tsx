'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import VideoControls from './VideoControls';

export default function GuestVideo() {
  const [isCameraOn, setCameraOn] = useState(true);
  const [isAudioOn, setAudioOn] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const getMediaPermission = useCallback(async () => {
    try {
      const videoConstraints = {
        audio: false,
        video: true,
      };

      const videoStream =
        await navigator.mediaDevices.getUserMedia(videoConstraints);

      if (videoRef.current) {
        videoRef.current.srcObject = isCameraOn ? videoStream : null;
      }
    } catch (err) {
      console.log(err);
    }
  }, [isCameraOn]);

  const toggleCamera = () => {
    setCameraOn((prev) => !prev);
  };

  const toggleAudio = () => {
    setAudioOn((prev) => !prev);
  };

  useEffect(() => {
    getMediaPermission();
  }, [getMediaPermission]);

  return (
    <div className='relative'>
      <div className='bg-black rounded-2xl w-[72rem] h-[44rem]'>
        <video
          ref={videoRef}
          autoPlay
          className='rounded-2xl size-full -scale-x-100 object-cover'
        />
      </div>
      <div className='absolute top-[13rem] -right-[21.8rem]'>
        <VideoControls
          isCameraOn={isCameraOn}
          isAudioOn={isAudioOn}
          toggleCamera={toggleCamera}
          toggleAudio={toggleAudio}
        />
      </div>
    </div>
  );
}
