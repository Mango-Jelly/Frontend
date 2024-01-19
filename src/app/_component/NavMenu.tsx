import React from 'react'
import Image from 'next/image'
import appLogo from '../../../public/AppMainLogo.png'

type Props = {
  isLogin: boolean
}

//TODO : isLogin property를 nextAuth 적용시 삭제
export default function NavMenu({ isLogin }: Props) {
  isLogin = false
  return (
    <header>
      <nav className='bg-white px-4 lg:px-6 py-2.5 shadow'>
        <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl'>
          <a href='/' className='flex items-center'>
            <Image src={appLogo} width={160} height={26} alt='' />
          </a>
          <div className='flex items-center lg:order-2'>
            <button
              type='button'
              className='text-white bg-main hover:bg-maindark font-medium rounded-3xl text-sm px-4 py-2 text-center'
            >
              {isLogin ? '로그아웃' : '로그인'}
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
