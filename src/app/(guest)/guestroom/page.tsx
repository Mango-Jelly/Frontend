import React from 'react';
import GuestVideo from './_component/GuestVideo';
import NicknameInput from './_component/NicknameInput';
import GoButton from './_component/GoButton';

export default function page() {
  return (
    <div className='flex justify-center items-center px-64 py-48'>
      <GuestVideo />
      <div className='flex flex-col justify-between items-end rounded-2xl border-4 border-dashed border-mainsky h-[44rem] px-6 py-12 ml-8'>
        <NicknameInput />
        <GoButton />
      </div>
    </div>
  );
}
