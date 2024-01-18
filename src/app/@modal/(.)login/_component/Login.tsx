'use client';

import style from './login.module.css'
import Image from 'next/image'
import AppLogo from '../../../../../public/AppMainLogo.png';
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useRouter } from 'next/navigation';
import Button from '@/app/_component/LoginButton'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const onChangeId: ChangeEventHandler<HTMLInputElement> = (e) => {
        setEmail(e.target.value);
    };

    const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
        setPassword(e.target.value);
    };

    const onClickClose = () => {
        router.back();
    };

    return (
        <div className={style.modalBackground}>
            <div className={style.modal}>
                <div className={style.modalHeader}>
                    <button className={style.closeButton} title='close' onClick={onClickClose}>
                        <svg width={24} viewBox="0 0 24 24" aria-hidden="true"
                            className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03">
                            <g>
                                <path
                                    d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                            </g>
                        </svg>
                    </button>
                    <Image className={style.applogo} src={AppLogo} width={316} height={59} alt='로고' />
                </div>
                <form>
                    <div className={style.modalBody}>
                        <div className={style.inputDiv}>
                            <label className={style.inputLabel} htmlFor="email">이메일</label>
                            <input id="email" className={style.input} value={email} onChange={onChangeId} type="text" placeholder="" />
                        </div>
                        <div className={style.inputDiv}>
                            <label className={style.inputLabel} htmlFor="password">비밀번호</label>
                            <input id="password" className={style.input} value={password} onChange={onChangePassword} type="password" placeholder="" />
                        </div>
                    </div>
                    <div className={style.modalFooter}>
                        <Button name={"로그인"} />
                    </div>
                </form>
            </div>
        </div>
    )
}
