import MemberCarousel from "../_component/MemberCarousel";
import GuestMain from "./GuestMain";

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center">
      <MemberCarousel />
      <GuestMain />
    </div>
  );
}
