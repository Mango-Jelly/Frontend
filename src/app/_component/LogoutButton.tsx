'use client';

import style from './logoutButton.module.css';

export default function LogoutButton() {
  return (
    <button title='로그아웃' className={style.logoutButton} >
      로그아웃
    </button>
  )
}
