'use client';

import style from './signup.module.css'
import Image from 'next/image'
import AppLogo from '../../../../../public/AppMainLogo.png';
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import Button from '@/app/_component/TriggerButton'
import BackButton from '@/app/_component/BackButton';
import { useRouter } from 'next/navigation';



export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    //TODO : 한번만 클릭할 수 있도록 더블클릭 방지로직 추가

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

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        // 유효성 검사 로직 추가
        if (!validateInputs()) {
            return;
        }

        // 통신 성공 시 처리 로직

        // 서버와의 통신 코드 추가
        // const result = await sendDataToServer();



        // TODO : 회원가입 성공 시 로그인 페이지로 이동

        alert('회원가입이 완료되었습니다.');
        router.replace('/login');
    };

    const validateInputs = () => {
        // 아이디 유효성 검사
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            setErrorMessage('이메일 형식이 올바르지 않습니다.');
            return false;
        }

        // 비밀번호 유효성 검사
        if (password.length < 8) {
            setErrorMessage('비밀번호는 8자 이상이어야 합니다.');
            return false;
        }

        // 비밀번호 체크
        if (password !== checkPassword) {
            setErrorMessage('비밀번호가 일치하지 않습니다.');
            return false;
        }

        // 닉네임 유효성 검사
        if (nickname.length > 10) {
            setErrorMessage('닉네임은 최대 10자까지 가능합니다.');
            return false;
        }

        // 모든 유효성 검사 통과
        setErrorMessage('');
        return true;
    };


    // TODO : 서버와의 통신 코드 작성
    const sendDataToServer = () => {
        // 서버와의 통신 코드 작성
        // 예시: axios.post('/api/signup', { email, password, nickname })
        //        .then(response => {
        //            // 통신 성공 시 처리 로직
        //        })
        //        .catch(error => {
        //            // 통신 실패 시 처리 로직
        //        });
    };



    return (
        <div className={style.modalBackground}>
            <div className={style.modal}>
                <BackButton />
                <div className={style.modalHeader}>
                    <Image className={style.applogo} src={AppLogo} width={316} height={59} alt='로고' />
                </div>
                <form onSubmit={handleSubmit}>
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
                                placeholder="예시) user@mail.com"
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
                        {errorMessage && <p className={style.error}>{errorMessage}</p>}
                    </div>
                    <div className={style.modalFooter}>
                        <button
                            title='로그인/로그아웃 버튼'
                            type='submit'
                            className={`text-white font-semibold text-3xl text-center bg-main hover:bg-maindark rounded-[2rem] px-12 py-4 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={isSubmitting}
                        >
                            회원가입
                        </button >
                    </div>
                </form>
            </div>
        </div>
    )
}
