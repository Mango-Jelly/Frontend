'use client';

import style from './login.module.css'
import Image from 'next/image'
import AppLogo from '../../../../../public/AppMainLogo.png';
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import BackButton from '@/app/_component/BackButton';
import { signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();
    const session = useSession();

    const onChangeId: ChangeEventHandler<HTMLInputElement> = (e) => {
        setEmail(e.target.value);
    };

    const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
        setPassword(e.target.value);
    };

    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setMessage('');


        const response = await signIn("credentials", {
            username: email,
            password,
            redirect: false
        });

        if (response?.error === 'CredentialsSignin') {
            setMessage('인증에 실패했습니다. 아이디와 비밀번호를 다시 확인해주세요.');
        }

        if (!response?.error) {
            router.back();
            router.refresh();
        }
    }

    return (
        <div className={style.modalBackground}>
            <div className={style.modal}>
                <BackButton />
                <div className={style.modalHeader}>
                    <Image className={style.applogo} src={AppLogo} width={316} height={59} alt='로고' />
                </div>
                <form onSubmit={onSubmit}>
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
                        <div>
                            {message}
                        </div>
                        <button
                            title='로그인 버튼'
                            type='submit'
                            className='text-white font-semibold text-3xl text-center bg-main hover:bg-maindark rounded-[2rem] px-12 py-4'
                            disabled={!email && !password}
                        >
                            로그인
                        </button >
                    </div>
                </form>
            </div>
        </div>
    )
}
