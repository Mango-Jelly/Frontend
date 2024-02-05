'use client';

import { useRef, useCallback, useEffect } from 'react';

type Props = {
  isCameraOn: boolean;
};

export default function GuestSettings({ isCameraOn }: Props) {
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
    </div>
  );
}
