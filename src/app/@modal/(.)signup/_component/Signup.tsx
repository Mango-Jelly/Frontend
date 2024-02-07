'use client';

import style from './signup.module.css'
import Image from 'next/image'
import AppLogo from '../../../../../public/AppMainLogo.png';
import BackButton from '@/app/_component/BackButton';
import signUp from '@/app/_lib/signup';
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';

function showMessage(message: string | null) {
    if (message === 'invalid_playName') {
        return '방 제목을 올바르게 입력해주세요. (30자 이내)';
    }
    if (message === 'invalid_department') {
        return '소속을 올바르게 입력해주세요. (20자 이내)';
    }
    return '';
}

export default function SignUp() {
    const [state, formAction] = useFormState(signUp, { message: null });
    const { pending } = useFormStatus();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);

        await signUp(form);
        router.back();
        router.refresh();
    };

    return (
        <div className={style.modalBackground}>
            <div className={style.modal}>
                <BackButton />
                <div className={style.modalHeader}>
                    <Image className={style.applogo} src={AppLogo} width={316} height={59} alt='로고' />
                </div>
                <form action={formAction} onSubmit={handleSubmit}>
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
                                name="nickname"
                                type="text"
                                className={style.input}
                                placeholder="2~10자 이내로 입력해주세요."
                                required
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
                                name='email'
                                className={style.input}
                                type="email"
                                placeholder="예시) user@mail.com"
                                required
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
                                name='password'
                                type="password"
                                className={style.input}
                                placeholder="영문, 숫자포함 8~20자 이내로 입력해주세요"
                                required
                            />
                        </div>
                        <div className={style.inputDiv}>
                            <label
                                className={style.inputLabel}
                                htmlFor="confirmPassword"
                            >
                                비밀번호 확인
                            </label>
                            <input
                                id="confrimPassword"
                                name='confirmPassword'
                                className={style.input}
                                type="password"
                                placeholder="입력한 비밀번호와 같은 비밀번호를 입력해주세요"
                                required
                            />
                        </div>
                        {<p className={style.error}>{showMessage(state?.message)}</p>}
                    </div>
                    <div className={style.modalFooter}>
                        <button
                            title='회원가입'
                            type='submit'
                            className={`text-white font-semibold text-3xl text-center bg-main hover:bg-maindark rounded-[2rem] px-12 py-4 `}
                            disabled={pending}
                        >
                            회원가입
                        </button >
                    </div>
                </form>
            </div>
        </div>
    )
}
