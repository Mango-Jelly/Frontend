import { ScriptType } from '../types/ScriptType';

type Props = {
  scriptInfo: ScriptType;
};

export default function ScenarioInfo({ scriptInfo }: Props) {
  return (
    <div className='flex flex-col justify-center items-center bg-white/80 w-[30%] h-[88%] m-2'>
      <div className='bg-gray-200 rounded-full size-72'></div>
      <p className='text-3xl font-bold m-4'>{scriptInfo.title}</p>
      <div className='flex justify-center items-center text-xl bg-gray-200 rounded-3xl w-4/5 h-20 m-2'>
        {scriptInfo.duration}
      </div>
      <div className='flex justify-center items-center text-xl bg-gray-200 rounded-3xl w-4/5 h-20 m-2'>
        {scriptInfo.person}
      </div>
      <div className='flex flex-col justify-center items-center text-xl bg-gray-200 rounded-3xl w-4/5 h-72 m-2'>
        {scriptInfo.roles.map((value, key) => {
          return <div key={key}>{`${value.role}\n`}</div>;
        })}
      </div>
    </div>
  );
}
