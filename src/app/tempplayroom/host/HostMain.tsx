import HostVideo from './HostVideo';
import HostSectionScript from './HostSectionScript';
import MemberRole from './MemberRole';
import MemberChecking from './MemberChecking';

export default function HostMain() {
  return (
    <>
      <div className='flex justify-center items-center bg-white/80 w-[116rem] h-[54rem]'>
        <div>
          <HostSectionScript />
          <MemberRole />
        </div>
        <HostVideo />
        <MemberChecking />
        {/* <div className='self-start flex flex-col justify-center items-center ml-4'></div> */}
      </div>
    </>
  );
}
