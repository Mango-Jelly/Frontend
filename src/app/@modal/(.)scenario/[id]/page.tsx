'use client';

// import style from '@/app/_component/modal.module.css'
import style from './modal.module.css'
import Leftcontainer from './leftcontainer/Leftcontainer';
import Rightcontainer from './rightcontainer/Rightcontainer';

type Props = {
    params: {
        id: string
    }
}

export default function Page({ params: { id } }: Props) {
    return (
        <div className={style.modalBackground } >
            <div className={style.modal}>
                <div className='grid grid-cols-3 p-[4rem]'>
                    <Leftcontainer />
                    <Rightcontainer />
                </div>
            </div>
        </div>
    )
}