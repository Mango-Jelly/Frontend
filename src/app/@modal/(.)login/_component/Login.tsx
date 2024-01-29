'use client';

import style from './login.module.css'
import Image from 'next/image'
import AppLogo from '../../../../../public/AppMainLogo.png';
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import BackButton from '@/app/_component/BackButton';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { AuthError } from 'next-auth';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const onChangeId: ChangeEventHandler<HTMLInputElement> = (e) => {
        setEmail(e.target.value);
        console.log(email)
    };

    const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
        setPassword(e.target.value);
        console.log(password)
    };

    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const response = await signIn("credentials", {
                username: email,
                password,
                redirect: false
            });

            console.log(
                "try문----------------------------------------------",
                response
            );


            if (!response?.error) {
                console.log(
                    "try문2----------------------------------------------",
                    response
                );
                setMessage("아이디와 비밀번호가 일치하지 않습니다.");
            } else {
                console.log(
                    "try문3----------------------------------------------",
                    response
                );

            }
            router.replace('/');

        } catch (error) {
            if (error instanceof AuthError) {
                switch (error.type) {
                    case 'CredentialsSignin':
                        return 'Invalid credentials';
                    default:
                        return 'Invalid credentials';
                }
            }
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
