import React from 'react'
import style from './navMenu.module.css'
import Image from 'next/image'
import appLogo from '../../../public/AppMainLogo.png'

type Props = {
  isLogin: boolean;
}

export default function NavMenu({ isLogin } : Props) {
  return (
    <div className={style.container}>
      <div className={style.imageWrapper}>
        <Image src={appLogo} width={246} height={40} alt=''/>
      </div>
      {isLogin && 
            <button title='로그아웃' className={style.logoutButton} >
              로그아웃
            </button>
      }
    </div>
  )
}
