'use client';

import style from './signup.module.css'
import Image from 'next/image'
import AppLogo from '../../../../../public/AppMainLogo.png';
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import Button from '@/app/_component/TriggerButton'
import BackButton from '@/app/_component/BackButton';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [checkPassword, setCheckPassword] = useState('');

    //TODO : 유효성 검사 추가
    //TODO : 한번만 클릭할 수 있도록 더블클릭 방지로직 추가
    //TODO :  React Hook Form 으로 리팩토링할 것

    const onChangeEmail: ChangeEventHandler<HTMLInputElement> = (e) => {
        setEmail(e.target.value);
    };

    const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
        setPassword(e.target.value);
    };

    const onChangeNickname: ChangeEventHandler<HTMLInputElement> = (e) => {
        setNickname(e.target.value);
    };

    const onChangeCheckPassword: ChangeEventHandler<HTMLInputElement> = (e) => {
        setCheckPassword(e.target.value);
    };

    return (
        <div className={style.modalBackground}>
            <div className={style.modal}>
                <BackButton />
                <div className={style.modalHeader}>
                    <Image className={style.applogo} src={AppLogo} width={316} height={59} alt='로고' />
                </div>
                <form>
                    <div className={style.modalBody}>
                        <div className={style.inputDiv}>
                            <label
                                className={style.inputLabel}
                                htmlFor="nickname"
                            >
                                닉네임
                            </label>
                            <input
                                id="nickname"
                                className={style.input}
                                value={nickname}
                                onChange={onChangeNickname}
                                type="text"
                                placeholder="10자 이내로 입력해주세요."
                            />
                        </div>
                        <div className={style.inputDiv}>
                            <label
                                className={style.inputLabel}
                                htmlFor="email"
                            >
                                이메일
                            </label>
                            <input
                                id="email"
                                className={style.input}
                                value={email}
                                onChange={onChangeEmail}
                                type="email"
                                placeholder=""
                            />
                        </div>
                        <div className={style.inputDiv}>
                            <label
                                className={style.inputLabel}
                                htmlFor="password"
                            >
                                비밀번호
                            </label>
                            <input
                                id="password"
                                className={style.input}
                                value={password}
                                onChange={onChangePassword}
                                type="password"
                                placeholder="영문, 숫자포함 8자리 이상 입력해주세요"
                            />
                        </div>
                        <div className={style.inputDiv}>
                            <label
                                className={style.inputLabel}
                                htmlFor="checkPassword"
                            >
                                비밀번호 확인
                            </label>
                            <input
                                id="checkPassword"
                                className={style.input}
                                value={checkPassword}
                                onChange={onChangeCheckPassword}
                                type="password"
                                placeholder="입력한 비밀번호와 같은 비밀번호를 입력해주세요"
                            />
                        </div>
                    </div>
                    <div className={style.modalFooter}>
                        <Button name='회원가입' onClick={() => { }} />
                    </div>
                </form>
            </div>
        </div>
    )
}
