import Image from "next/image";
import img_yellowcorn from "@/../public/img_yellowcorn.svg";
import { OpenVidu, Subscriber } from 'openvidu-browser';
import UserVideoComponent from '@/app/playroom/[roomId]/_component/UserVIdeo';


type Props = {
  myHost : [string, Subscriber | null]
};

export default function HostVideoToGuest(props : Props) {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex self-start ml-4">
        <Image src={img_yellowcorn} width={90} height={68} alt="선생님 화면" />
        <p className="text-5xl font-semibold mt-5 ml-4">우리 선생님 화면</p>
      </div>
      <div className="bg-gray-200 rounded-2xl w-[60rem] h-[36rem]">
        {
          props.myHost[1] ?
          <UserVideoComponent streamManager={props.myHost[1]}/>
          : null
        }
      </div>
    </div>
  );
}
