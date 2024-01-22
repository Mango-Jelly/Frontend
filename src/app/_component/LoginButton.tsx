'use client';

import style from './loginButton.module.css';
interface Props {
  name: string;
}

export default function LoginButton({ name }: Props) {
  return (
    <button title='로그인/로그아웃 버튼' className={style.button} >
      {name}
    </button>
  )
}
