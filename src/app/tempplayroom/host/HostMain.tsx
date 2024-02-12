import HostVideo from "./HostVideo";

export default function HostMain() {
  return (
    <>
      <div className="flex justify-center bg-white/80 w-[112rem] h-[48rem] mt-8">
        <HostVideo />
        <div className="self-start flex flex-col justify-center items-center ml-4"></div>
      </div>
    </>
  );
}
