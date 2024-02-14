import Link from 'next/link';
import Image from 'next/image';
import pinIcon from '../../../public/YellowPinIcon.png';

import { getScriptList } from '@/api/script';

interface Script {
  scriptId: number;
  thumbnail: string;
  title: string;
}

export default async function ScriptList() {
  let scripts = [];

  try {
    const fetchedData = await getScriptList();
    scripts = fetchedData.data.scripts;
  } catch (error) {
    console.error('대본 리스트 가져오기 에러', error);
  }

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
        <p className='text-3xl text-highlight font-bold'>
          동화 대본 구경하기
        </p>
      </div>
      <div className='flex flex-wrap justify-evenly h-auto mt-4'>
        {scripts.map((value: Script) => {
          return (
            <div
              key={value.scriptId}
              className='w-[17rem] rounded-2xl p-2 hover:bg-gray-100 cursor-pointer'
            >
              <Link href={`/scenario/${value.scriptId}`}>
                <Image
                  src={value.thumbnail}
                  width={300}
                  height={300}
                  alt={value.title}
                  className='rounded-2xl h-40 mb-2'
                ></Image>
                <div className='truncate text-lg text-center'>
                  {value.title}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
