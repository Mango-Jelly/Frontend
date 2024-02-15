'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';

interface Props {
  isLogin: boolean;
}

export default function LoginButton({ isLogin }: Props) {
  const router = useRouter();
  const pathName = usePathname().split('/');

  if(pathName.includes(('playroom')) || pathName.includes(('guestroom'))) return null;

  const loginButtonClass =
    'text-white font-semibold text-2xl text-center bg-main hover:bg-maindark rounded-[2rem] px-6 py-3';

  return (
    <>
      {isLogin ? (
        <button
          title='로그아웃'
          type='button'
          onClick={() => {
            signOut({ redirect: false })
              .then(() => {
                router.refresh(); // Redirect to the dashboard page after signing out
              });
          }}
          className={loginButtonClass}
        >
          로그아웃
        </button >)
        :
        <Link href='/signup'>
          <button
            title='회원가입'
            type='button'
            className={loginButtonClass}
          >
            회원가입
          </button>
        </Link>
      }
    </>
  )
}