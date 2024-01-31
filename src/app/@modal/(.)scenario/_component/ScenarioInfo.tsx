import { info } from 'console';
import { ScriptType } from '../types/ScriptType';

type Props = {
  scriptInfo: ScriptType;
};

export default function ScenarioInfo({ scriptInfo }: Props) {
  const infoBoxClass =
    'flex justify-center items-center bg-gray-100 rounded-3xl border-mainsky border-4 border-dashed w-4/5 m-2';

  return (
    <div className='flex flex-col justify-center items-center bg-white/80 w-[30%] h-[88%] m-2 z-20'>
      <div className='bg-gray-200 rounded-full size-72'></div>
      <p className='text-3xl font-bold m-4'>{scriptInfo.title}</p>
      <div className={`${infoBoxClass} h-20`}>
        <p className='text-2xl'>{`예상 소요 시간 : ${scriptInfo.duration}`}</p>
      </div>
      <div className={`${infoBoxClass} h-20`}>
        <p className='text-2xl'>{`참여 가능 인원 : ${scriptInfo.person}명`}</p>
      </div>
      <div className={`${infoBoxClass} flex flex-col justify-around h-72 p-4`}>
        <p className='text-2xl my-4'>등장인물</p>
        <div className='flex flex-wrap justify-center'>
          {scriptInfo.roles.map((value, key) => {
            return (
              <div key={key} className='text-center w-18 m-2'>
                <div className='bg-gray-200 rounded-full size-16'>
                  {value.img}
                </div>
                <p className='truncate text-lg'>{`${value.role}\n`}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
