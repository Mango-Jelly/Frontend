'use client';

import style from './newRoom.module.css'
import Image from 'next/image'
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import Button from '@/app/_component/TriggerButton'
import pigTailLeft from '@/../public/pigtailLeft.svg'
import pigTailRight from '@/../public/pigtailRight.svg'
import BackButton from '@/app/_component/BackButton';

export default function Login() {
    const [roomName, setRoomName] = useState('');
    const [department, setDepartment] = useState('');
    const [isPublic, setIsPublic] = useState(false);

    const onChangeRoomName: ChangeEventHandler<HTMLInputElement> = (e) => {
        setRoomName(e.target.value);
    };

    const onChangeDepartment: ChangeEventHandler<HTMLInputElement> = (e) => {
        setDepartment(e.target.value);
    };

    const onChangeIsPublic: ChangeEventHandler<HTMLInputElement> = (e) => {
        setIsPublic(e.target.checked);
    };

    return (
        <div className={style.modalBackground}>
            <div className={style.modal}>
                <BackButton />
                <Image src={pigTailLeft} alt="pigTailLeft" className={style.pigTailLeft} />
                <Image src={pigTailRight} alt="pigTailRight" className={style.pigTailRight} />

                <h1 className="text-4xl font-bold mt-8">
                    방 생성
                </h1>
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
                        <Button name='방생성' isSubmitting={false} />
                    </div>
                </form>
            </div>
        </div>
    )
}
