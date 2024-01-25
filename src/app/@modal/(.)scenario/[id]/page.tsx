'use client';

// import style from '@/app/_component/modal.module.css'
import style from './modal.module.css'
import Leftcontainer from './leftcontainer/Leftcontainer';
import Rightcontainer from './rightcontainer/Rightcontainer';
import BackButton from '@/app/_component/BackButton';

type Props = {
    params: {
        id: string
    }
}

export default function Page({ params: { id } }: Props) {
    return (
        <div className={style.modalBackground} >
            <div className={style.modal}>
                <BackButton />
                <Leftcontainer />
                <Rightcontainer />
            </div>
        </div>
    )
}