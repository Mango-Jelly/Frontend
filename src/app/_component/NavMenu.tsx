import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import appLogo from '../../../public/AppMainLogo.png';
import LoginButton from './LoginButton';
import { auth } from '@/auth';
import { usePathname } from 'next/navigation';


export default async function NavMenu() {
  const session = await auth();

  return (
    <header>
      <nav className='flex justify-center bg-white px-12 py-4 shadow'>
        <div className='grow flex flex-wrap justify-between items-center lg:mx-64 max-w-screen-xl'>
          <Link href='/'>
            <Image src={appLogo} width={196} height={32} alt='망고테일' />
          </Link>
          <div className='text-2xl font-semibold lg:order-2 flex flex-wrap justify-between items-center flex-row'>
            <p className="mr-8">
              {session && `${session.user?.name} 선생님, 오늘도 행복한 하루되세요!`}
            </p>
            <LoginButton isLogin={session ? true : false} />
          </div>
        </div>
      </nav>
    </header>
  );
}
