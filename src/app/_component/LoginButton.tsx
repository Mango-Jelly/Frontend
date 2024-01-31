'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Props {
  isLogin: boolean;
}

export default function LoginButton({ isLogin }: Props) {
  const router = useRouter();

  return (
    <>
      {
        isLogin ?
          <button
            title='로그아웃'
            type='button'
            className='text-white font-semibold text-xl text-center bg-main hover:bg-maindark rounded-[2rem] px-6 py-2.5'
            onClick={() => {
              signOut({ redirect: false })
                .then(() => {
                  router.refresh(); // Redirect to the dashboard page after signing out
                });
            }}
          >
            로그아웃
          </button >
          :
          <Link href='/signup'>
            <button
              title='회원가입'
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
