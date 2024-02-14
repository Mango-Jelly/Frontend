'use client';

import { useState } from 'react';
import { Subscriber } from 'openvidu-browser';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import UserVideoComponent from '@/app/playroom/[roomId]/_component/UserVIdeo';

type CameraUnit = {
  userId: string;
  Subscriber: Subscriber;
};

type UserStatus = {
  name: string;
  status: number;
  role: string;
  camera: Subscriber | null;
};

type Props = {
  call: string;
  ENTRY: UserStatus[];
  // subscribers: CameraUnit[];
};

export default function MemberCarousel(props: Props) {
  const tempMember = [1, 2, 3, 4, 5];

  const [currentIndex, setCurrentIndex] = useState(0);
  const maxItemsPerSlide: number = 5;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    console.log(currentIndex);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < props.ENTRY.length - maxItemsPerSlide
        ? prevIndex + 1
        : prevIndex
    );
  };

  return (
    <div className='w-[121.5rem] my-12'>
      <div className='flex justify-center items-center'>
        <ChevronLeftIcon
          onClick={handlePrev}
          className='fill-gray-200 size-24 hover:fill-gray-400'
        />
        <div className='flex flex-row space-x-4 overflow-x-hidden overflow-hidden w-full'>
          <div
            className='carousel'
            style={{
              left: `-${currentIndex * (100 / maxItemsPerSlide)}%`,
            }}
          >
            {props.ENTRY.map((event, id) => (
              <div className='w-1/5' key={id}>
                {event.camera ? (
                  <div className='w-[20rem] h-[14rem] mx-4 pb-[2rem]'>
                    <UserVideoComponent key={id} streamManager={event.camera} />
                  </div>
                ) : (
                  <div className='flex'>
                    {tempMember.map((value, key) => {
                      return (
                        <div key={key} className='shrink-0'>
                          <div className='animate-pulse bg-gray-300 rounded-2xl w-[20rem] h-[12rem] mx-4'></div>
                          <p className='text-xl text-center mt-1'>입장 대기중</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <ChevronRightIcon
          onClick={handleNext}
          className='fill-gray-200 size-24 hover:fill-gray-400'
        />
      </div>
    </div>
  );
}
