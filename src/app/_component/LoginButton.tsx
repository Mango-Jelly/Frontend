'use client';

import Link from 'next/link';

interface Props {
  isLogin: boolean;
}

export default function LoginButton({ isLogin }: Props) {
  const onClickSignOut = () => {};

  const loginButtonClass =
    'text-white font-semibold text-2xl text-center bg-main hover:bg-maindark rounded-[2rem] px-6 py-3';

  return (
    <>
      {isLogin ? (
        <button
          title='로그인/로그아웃 버튼'
          type='button'
          className={loginButtonClass}
          onClick={onClickSignOut}
        >
          로그아웃
        </button>
      ) : (
        <Link href='/signup'>
          <button
            title='로그인/로그아웃 버튼'
            type='button'
            className={loginButtonClass}
          >
            회원가입
          </button>
        </Link>
      )}
    </>
  );
}
