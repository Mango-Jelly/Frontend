import Image from "next/image";
import img_yellowcorn from "@/../public/img_yellowcorn.svg";

export default function HostVideo() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex self-start ml-4">
        <Image src={img_yellowcorn} width={90} height={68} alt="선생님 화면" />
        <p className="text-5xl font-semibold mt-5 ml-4">우리 선생님 화면</p>
      </div>
      <div className="bg-gray-200 rounded-2xl w-[60rem] h-[36rem]"></div>
    </div>
  );
}
