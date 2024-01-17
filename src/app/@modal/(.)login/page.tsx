'use client';

import style from '@/app/_component/modal.module.css'


export default function Page() {
    return (
        <div className={style.modalBackground}>
            <div className={style.modal}>
                로그인 모달입니다
            </div>
        </div>
    )
}
