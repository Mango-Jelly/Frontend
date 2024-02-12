import MemberCarousel from "../_component/MemberCarousel";
import HostMain from "./HostMain";

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center">
      <MemberCarousel />
      <HostMain />
    </div>
  );
}
