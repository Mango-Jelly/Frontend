import Image from 'next/image';
import img_clovar from '@/../public/img_clovar.png';
import style from '../_component/scrollbar.module.css';

export default function MemberChecking() {
  const members = ['김상범', '강용민', '김남준', '이승헌', '김한슬', '윤서안', '김싸피', '박싸피'];

  return (
    <div className='bg-white shadow w-[24rem] h-[50rem] ml-6 px-4'>
      <div className='flex items-center px-4 py-4'>
        <Image src={img_clovar} width={28} height={28} alt='참가자 상태 확인' />
        <p className='text-3xl font-medium ml-3'>참가자 상태 확인</p>
      </div>
      <div className='overflow-auto h-[43.5rem]' id={style.scroll}>
        {members.map((value, key) => {
          return (
            <div key={key} className='flex items-center m-4'>
              <div className='bg-gray-400 rounded-full size-20'></div>
              <div className='m-4'>
                <p className='text-xl'>{value}</p>
                <p>첫째 돼지</p>
              </div>
              <div className='bg-gray-400 rounded-full size-12 ml-12'></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
