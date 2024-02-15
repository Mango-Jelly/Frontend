import Image from 'next/image';
import img_clovar from '@/../public/img_clovar.png';
import status201 from '@/../public/status201.svg';
import status202 from '@/../public/status202.svg';
import status203 from '@/../public/status203.svg';
import status204 from '@/../public/status204.svg';
import style from '../_component/scrollbar.module.css';

type Props = {
  ENTRY: UserStatus[];
};

type UserStatus = {
  name: string;
  status: number;
  role: string;
  roleImg: string;
};

const status: any[] = [status201, status202, status203, status204];

export default function MemberChecking(props: Props) {
  return (
    <div className='bg-white shadow w-[24rem] h-[50rem] ml-6 px-4'>
      <div className='flex items-center px-4 py-4'>
        <Image src={img_clovar} width={28} height={28} alt='참가자 상태 확인' />
        <p className='text-3xl font-medium ml-3'>참가자 상태 확인</p>
      </div>
      <div className='overflow-auto h-[43.5rem]' id={style.scroll}>
        {props.ENTRY.map((entry, id) => (
          <div key={id} className='flex items-center m-4'>
            {entry.role ? (
              <Image
                src={entry.roleImg}
                width={100}
                height={100}
                alt={entry.role}
                className='rounded-full size-20 object-cover'
              />
            ) : (
              <div className='bg-gray-400 rounded-full size-20 animate-pulse'></div>
            )}
            <div className='m-4'>
              <p className='text-xl'>{entry.name}</p>
              <p>{entry.role ? entry.role : '아직 역할이 없어요'}</p>
            </div>

            {entry.status ? (
              <div>
                <Image
                  src={status[entry.status - 201]}
                  alt='상태사진'
                  className='h-[5rem] w-[5rem]'
                />
              </div>
            ) : (
              <span className='h-[5rem] w-[5rem]'></span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
