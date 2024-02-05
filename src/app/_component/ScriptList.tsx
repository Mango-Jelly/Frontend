import { scripts } from '../../data/Dummy';
import pinIcon from '../../../public/YellowPinIcon.png';
import Image from 'next/image';
import Link from 'next/link';

// TODO : 동화 대본 리스트 불러오기 API 연결
export default function ScriptList() {
  return (
    <div className='bg-white rounded-[2rem] w-1/2 p-4 ml-2 h-full'>
      <div className='flex px-8 py-2'>
        <Image
          src={pinIcon}
          width={24}
          height={28}
          alt='동화 대본 구경하기'
          className='-scale-x-100 -rotate-12 mr-4'
        />
        <p className='text-3xl text-highlight font-semibold'>
          동화 대본 구경하기
        </p>
      </div>
      <div className='flex flex-wrap justify-evenly h-auto mt-4'>
        {scripts.map((value, key) => {
          return (
            <div
              key={key}
              className='w-[17rem] rounded-2xl p-2 hover:bg-gray-100 cursor-pointer'
            >
              <Link href={`/scenario/${value.script_id}`}>
                <div className=' bg-gray-200 rounded-2xl h-40 mb-2'></div>
                <div className='truncate text-lg text-center'>{value.title}</div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
