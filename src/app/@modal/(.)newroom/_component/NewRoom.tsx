'use client';

import style from './newRoom.module.css'
import Image from 'next/image'
import { ChangeEventHandler, useState } from "react";
import Button from '@/app/_component/TriggerButton'
import pigTailLeft from '@/../public/pigtailLeft.svg'
import pigTailRight from '@/../public/pigtailRight.svg'
import BackButton from '@/app/_component/BackButton';
import makePlayRoom from '@/app/_lib/makePlayRoom';
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [state, formAction] = useFormState(makePlayRoom, { message: null });
    const { pending } = useFormStatus();
    const router = useRouter();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        await makePlayRoom(form);
        router.back();
        router.refresh();
    }

    return (
        <div className={style.modalBackground}>
            <div className={style.modal}>
                <BackButton />
                <Image src={pigTailLeft} alt="pigTailLeft" className={style.pigTailLeft} />
                <Image src={pigTailRight} alt="pigTailRight" className={style.pigTailRight} />

                <h1 className="text-4xl font-bold mt-8">
                    방 생성
                </h1>
                <form action={formAction} onSubmit={onSubmit}>
                    <div className={style.modalBody}>
                        <div className={style.inputDiv}>
                            <label className={style.inputLabel} 
                                htmlFor="roomName">
                                방제목
                            </label>
                            <input
                                id="roomName"
                                name="roomName"
                                className={style.input}
                                type="text"
                                placeholder="20자 이내로 방 제목을 입력해 주세요."
                                required
                            />
                        </div>
                        <div className={style.inputDiv}>
                            <label className={style.inputLabel} htmlFor="department">소속</label>
                            <input 
                                id="department"
                                name="department"
                                className={style.input}
                                type="text"
                                placeholder="연극을 진행할 팀의 소속을 입력해 주세요. (예시: 꿈나무 유치원, 망고 초등학교)"
                                required
                            />
                        </div>
                        <label 
                            htmlFor="isPublic"
                        >
                            완성영상 공개 설정
                        </label>
                        <input
                            type="checkbox"
                            id='isPublic'
                            name="isPublic"
                        />

                    </div>
                    <div className={style.modalFooter}>
                        <Button name='방생성' isSubmitting={false} />
                    </div>
                </form>
            </div>
        </div>
    )
}
