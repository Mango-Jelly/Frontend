'use client';

import style from './newRoom.module.css'
import Image from 'next/image'
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useRouter } from 'next/navigation';
import Button from '@/app/_component/LoginButton'
import pigTailLeft from '@/../public/pigtailLeft.svg'
import pigTailRight from '@/../public/pigtailRight.svg'

export default function Login() {
    const [roomName, setRoomName] = useState('');
    const [department, setDepartment] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const router = useRouter();

    const onChangeRoomName: ChangeEventHandler<HTMLInputElement> = (e) => {
        setRoomName(e.target.value);
    };

    const onChangeDepartment: ChangeEventHandler<HTMLInputElement> = (e) => {
        setDepartment(e.target.value);
    };

    const onChangeIsPublic: ChangeEventHandler<HTMLInputElement> = (e) => {
        setIsPublic(e.target.checked);
    };

    const onClickClose = () => {
        router.back();
    };

    return (
        <div className={style.modalBackground}>
            <div className={style.modal}>

                <Image src={pigTailLeft} alt="pigTailLeft" className={style.pigTailLeft} />
                <Image src={pigTailRight} alt="pigTailRight" className={style.pigTailRight} />

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
                </div>
                <form>
                    <div className={style.modalBody}>
                        <div className={style.inputDiv}>
                            <label className={style.inputLabel} htmlFor="roomName">방제목</label>
                            <input
                                id="roomName"
                                className={style.input}
                                value={roomName}
                                onChange={onChangeRoomName}
                                type="text"
                                placeholder="50자 이내로 방 제목을 입력해 주세요."
                            />
                        </div>
                        <div className={style.inputDiv}>
                            <label className={style.inputLabel} htmlFor="department">소속</label>
                            <input id="department"
                                className={style.input}
                                value={department}
                                onChange={onChangeDepartment}
                                type="text"
                                placeholder="연극을 진행할 팀의 소속을 입력해 주세요. (예시: 꿈나무 유치원, 망고 초등학교)"
                            />
                        </div>
                        {/*아래에 체크박스 인풋 만들어줘 */}
                        <label htmlFor="isPublic">완성영상 공개 설정 </label>
                        <input
                            type="checkbox"
                            id='isPublic'
                            name="isPublic"
                            checked={isPublic}
                            onChange={(e) => onChangeIsPublic(e)}
                        />

                    </div>
                    <div className={style.modalFooter}>
                        <Button name={"만들기"} />
                    </div>
                </form>
            </div>
        </div>
    )
}
