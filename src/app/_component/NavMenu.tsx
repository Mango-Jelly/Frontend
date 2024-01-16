import React from 'react'
import style from './navMenu.module.css'
import Image from 'next/image'
import appLogo from '../../../public/AppMainLogo.png'
import LogoutButton from './LogoutButton'

type Props = {
  isLogin: boolean;
}

//TODO : isLogin property를 nextAuth 적용시 삭제
export default function NavMenu({ isLogin } : Props) {
  return (
    <div className={style.container}>
      <div className={style.imageWrapper}>
        <Image src={appLogo} width={246} height={40} alt=''/>
      </div>
      {isLogin && <LogoutButton />}
    </div>
  )
}
