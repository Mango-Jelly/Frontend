import Image from 'next/image';
import CookieHouse from '@/../public/CookieHouse.png';
import style from '../_component/scrollbar.module.css';

export default function HostSectionScript() {
  const scripts = [
    '헨젤과 그레텔',
    '아기 돼지 삼형제',
    '신데렐라',
    '대본 이름',
    '대본 이름',
  ];

  return (
    <div className='bg-white shadow w-[24rem] h-[20rem] mr-6 mb-4 px-4'>
      <div className='flex items-center px-4 py-4'>
        <Image
          src={CookieHouse}
          width={28}
          height={30}
          alt='연극 대본 고르기'
        />
        <p className='text-3xl font-medium ml-3'>연극 대본 고르기</p>
      </div>
      <div className='overflow-auto h-[14rem]' id={style.scroll}>
        {scripts.map((value, key) => {
          return (
            <div key={key} className='bg-gray-200 rounded-xl w-[20rem] mb-2'>
              <p className='text-xl p-3'>{value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
