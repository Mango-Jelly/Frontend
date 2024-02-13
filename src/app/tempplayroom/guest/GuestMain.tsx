import HostVideo from './HostVideo';
import GuestState from './GuestState';
import StateButtonGrid from './StateButtonGrid';

export default function GuestMain() {
  return (
    <>
      <div className='bg-amber-200 mb-4'>
        <p className='text-2xl'>꿈나무 유치원 망고 연극반</p>
      </div>
      <div className='flex justify-center bg-white/80 w-[112rem] h-[48rem]'>
        <HostVideo />
        <div className='self-start flex flex-col justify-center items-center ml-4'>
          <GuestState />
          <StateButtonGrid />
        </div>
      </div>
    </>
  );
}
