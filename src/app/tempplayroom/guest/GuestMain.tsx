import HostVideo from "./HostVideo";
import GuestState from "./GuestState";
import StateButtonGrid from "./StateButtonGrid";

export default function GuestMain() {
  return (
    <>
      <div className="flex justify-center bg-white/80 w-[112rem] h-[48rem] mt-8">
        <HostVideo />
        <div className="self-start flex flex-col justify-center items-center ml-4">
          <GuestState />
          <StateButtonGrid />
        </div>
      </div>
    </>
  );
}
