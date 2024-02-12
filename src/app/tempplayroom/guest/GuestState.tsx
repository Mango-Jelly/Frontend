"use client";

import { useState } from "react";

import Image from "next/image";
import VideoIcon from "@/../public/VideoIcon.svg";
import VideoOffIcon from "@/../public/VideoOffIcon.svg";
import MicIcon from "@/../public/MicIcon.svg";
import MicOffIcon from "@/../public/MicOffIcon.svg";

export default function GuestState() {
  const controlButtonClass = "rounded-[2rem] bg-main px-6 py-2 m-1 hover:bg-maindark";

  const [isCameraOn, setCameraOn] = useState(true);
  const [isAudioOn, setAudioOn] = useState(true);

  const toggleCamera = () => {
    setCameraOn((prev) => !prev);
  };

  const toggleAudio = () => {
    setAudioOn((prev) => !prev);
  };

  return (
    <div className="flex justify-between items-center w-[44rem] my-8">
      <div className="flex items-center">
        <div className="bg-gray-200 rounded-full size-32 mx-4"></div>
        <div className="">
          <div className="text-3xl">
            나의 역할은
            <div className="flex items-center">
              <p className="text-4xl font-medium mr-2">미천한 난쟁이 6</p>에요!
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <button onClick={toggleCamera} className={controlButtonClass}>
          {isCameraOn ? (
            <Image src={VideoIcon} width={32} height={32} alt="카메라 끄기" />
          ) : (
            <Image src={VideoOffIcon} width={32} height={32} alt="카메라 켜기" />
          )}
        </button>
        <button onClick={toggleAudio} className={controlButtonClass}>
          {isAudioOn ? (
            <Image src={MicIcon} width={32} height={32} alt="마이크 끄기" />
          ) : (
            <Image src={MicOffIcon} width={32} height={32} alt="마이크 켜기" />
          )}
        </button>
      </div>
    </div>
  );
}
