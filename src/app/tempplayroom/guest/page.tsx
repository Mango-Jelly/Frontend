import MemberCarousel from '../_component/MemberCarousel';
import GuestMainSection from './GuestMainSection';

export default function Page() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <MemberCarousel />
      <GuestMainSection />
    </div>
  );
}
