import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import appLogo from '../../../public/AppMainLogo.png'
import LoginButton from './LoginButton'
import { auth } from '@/auth'

// TODO : isLogin property를 nextAuth 적용시 삭제
export default async function NavMenu() {
  const session = await auth();

  return (
    <header>
      <nav className='flex justify-center bg-white px-12 py-4 shadow'>
        <div className='grow flex flex-wrap justify-between items-center lg:mx-52 max-w-screen-2xl'>
          <Link href='/'>
            <Image src={appLogo} width={160} height={26} alt='' />
          </Link>
          <div className='lg:order-2'>
            <LoginButton isLogin={session ? true : false} />
          </div>
        </div>
      </nav>
    </header>
  )
}
