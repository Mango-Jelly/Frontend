'use client';

import Link from 'next/link';
import style from './loginButton.module.css';

interface Props {
  isLogin: boolean;
}

export default function LoginButton({ isLogin }: Props) {
  const onClickSignOut = () => {

  };

  return (
    <>
      {
        isLogin ?
          <button
            title='로그인/로그아웃 버튼'
            type='button'
            className='text-white font-semibold text-xl text-center bg-main hover:bg-maindark rounded-[2rem] px-6 py-2.5'
            onClick={onClickSignOut}
          >
            로그아웃
          </button >
          :
          <Link href='/signup'>
            <button
              title='로그인/로그아웃 버튼'
              type='button'
              className='text-white font-semibold text-xl text-center bg-main hover:bg-maindark rounded-[2rem] px-6 py-2.5'
            >
              회원가입
            </button>
          </Link>
      }
    </>


  )
}
