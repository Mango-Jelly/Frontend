'use client';

import style from './login.module.css'
import Image from 'next/image'
import AppLogo from '../../../../../public/AppMainLogo.png';
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import BackButton from '@/app/_component/BackButton';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const onChangeId: ChangeEventHandler<HTMLInputElement> = (e) => {
        setEmail(e.target.value);
    };

    const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
        setPassword(e.target.value);
    };

    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            await signIn("credentials", {
                username: email,
                password: password,
                redirect: false
            })
            router.replace('/');
        } catch (error) {
            console.log(error);
            setMessage('로그인 실패, 잠시 후 다시 시도해주세요.');
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
                        >
                            로그인
                        </button >
                    </div>
                </form>
            </div>
        </div>
    )
}
