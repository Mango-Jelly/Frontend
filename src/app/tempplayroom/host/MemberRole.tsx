'use client';

import Image from 'next/image';
import img_yellowbear from '@/../public/img_yellowbear.svg';
import style from '../_component/scrollbar.module.css';

export default function MemberRole() {
  const roles = ['첫째 돼지', '둘째 돼지', '셋째 돼지', '늑대', '돼지'];
  const members = ['김상범', '강용민', '김남준', '이승헌', '김한슬'];

  return (
    <>
      <div className='bg-white shadow w-[24rem] h-[30rem] px-4'>
        <div className='flex items-center px-3 py-3'>
          <Image
            src={img_yellowbear}
            width={32}
            height={32}
            alt='역할 부여하기'
          />
          <p className='text-3xl font-medium ml-2'>역할 부여하기</p>
        </div>
        <div className='overflow-auto h-[23.5rem]' id={style.scroll}>
          {roles.map((value, key) => {
            return (
              <div
                key={key}
                className='flex items-center bg-gray-200 rounded-xl w-[20rem] p-4 mb-2'
              >
                <div className='bg-gray-400 rounded-full size-20'></div>
                <div className='ml-3'>
                  <label className='block ml-2 mb-1 text-xl font-medium'>
                    {value}
                  </label>
                  <select
                    className='border border-gray-300 text-xl rounded-lg block w-full p-2
                    focus:outline-0 focus:ring-2 focus:ring-main'
                  >
                    <option selected>역할 선택</option>
                    {members.map((member, key) => {
                      return (
                        <option key={key} value={member}>
                          {member}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
