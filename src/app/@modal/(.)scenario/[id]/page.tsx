'use client';

import style from '@/app/_component/modal.module.css'

type Props = {
    params: {
        id: string
    }
}

export default function Page({ params: { id } }: Props) {
    return (
        <div className={style.modalBackground}>
            <div className={style.modal}>
                `${id}`번 시나리오 입니다.
            </div>
        </div>
    )
}