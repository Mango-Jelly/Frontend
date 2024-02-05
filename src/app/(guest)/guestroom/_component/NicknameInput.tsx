'use client';

import { useState, ChangeEventHandler } from 'react';
import Image from 'next/image';
import pinIcon from '@/../public/YellowPinIcon.png';

const MAX_NICKNAME_LENGTH = 10;

type Props = {
  nickname: string;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
  isValid: boolean;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NicknameInput({
  nickname,
  setNickname,
  isValid,
  setIsValid,
}: Props) {
  const onChangeNickname: ChangeEventHandler<HTMLInputElement> = (e) => {
    validateNickname();
    setNickname(e.target.value);
  };

  const validateNickname = () => {
    if (nickname.length > MAX_NICKNAME_LENGTH) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  return (
    <div className=''>
      <div className='flex items-center mb-4'>
        <Image
          src={pinIcon}
          width={24}
          height={28}
          alt='방 입장 닉네임'
          className='-scale-x-100 -rotate-12'
        />
        <p className='text-3xl font-medium ml-2'>방 입장 닉네임</p>
      </div>
      <input
        type='text'
        placeholder='10자 이내로 입력해 주세요'
        value={nickname}
        className={`text-3xl font-light placeholder:truncate border rounded-[2rem] px-6 py-3 focus:outline-none
        ${
          isValid
            ? 'focus:border-sky-400 focus:ring-1 focus:ring-sky-400'
            : 'focus:border-rose-400 focus:ring-1 focus:ring-rose-400 border-rose-500'
        }`}
        onChange={onChangeNickname}
      />
      <p
        className={`text-rose-600 text-lg mt-2 ml-6 ${isValid ? 'hidden' : 'block'}`}
      >
        닉네임은 1자 이상 10자 이하로 입력해 주세요!
      </p>
    </div>
  );
}
