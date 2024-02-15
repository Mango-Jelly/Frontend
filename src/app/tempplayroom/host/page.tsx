import MemberCarousel from "../_component/MemberCarousel";
import HostMain from "./HostMainSection";

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center">
      <MemberCarousel />
      <HostMain />
    </div>
  );
}
