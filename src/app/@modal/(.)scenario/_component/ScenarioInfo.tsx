import Image from 'next/image';
import { ScriptType } from '../types/ScriptType';

type Props = {
  scriptInfo: ScriptType;
};

export default function ScenarioInfo({ scriptInfo }: Props) {
  const infoBoxClass =
    'flex justify-center items-center bg-gray-100 rounded-3xl border-mainsky border-4 border-dashed w-4/5 m-2';

  return (
    <div className='flex flex-col justify-center items-center bg-white/80 w-[30%] h-[88%] m-2 z-20'>
      <Image
        src={scriptInfo.thumbnail}
        width={300}
        height={300}
        alt={scriptInfo.title}
        className='rounded-full size-72 object-cover'
      ></Image>
      <p className='text-3xl font-bold m-4'>{scriptInfo.title}</p>
      <div className={`${infoBoxClass} h-20`}>
        <p className='text-2xl'>{`예상 소요 시간 : ${scriptInfo.duration}`}</p>
      </div>
      <div className={`${infoBoxClass} h-20`}>
        <p className='text-2xl'>{`참여 가능 인원 : ${scriptInfo.reqPerson}명`}</p>
      </div>
      <div className={`${infoBoxClass} flex flex-col justify-around h-72 p-4`}>
        <p className='text-2xl my-4'>등장인물</p>
        <div className='flex flex-wrap justify-center'>
          {scriptInfo.roles.map((value, key) => {
            return (
              <div key={key} className='text-center w-18 m-2'>
                <Image
                  src={value.roleImg}
                  width={100}
                  height={100}
                  alt={scriptInfo.title}
                  className='rounded-full size-16 object-cover'
                ></Image>
                <p className='truncate text-lg'>{`${value.roleName}\n`}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
