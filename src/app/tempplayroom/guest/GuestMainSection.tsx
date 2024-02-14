import HostVideoToGuest from './HostVideoToGuest';
import GuestState from './GuestState';
import StateButtonGrid from './StateButtonGrid';

import * as StompJs from '@stomp/stompjs';

type Props = {
  depart: string;
  title: string;
  client: StompJs.Client;
  userId: string;
  roomId: string;
  curRole: string;
};

export default function GuestMainSection(Props: Props) {
  return (
    <>
      <div className='bg-amber-200 mb-8'>
        <p className='text-4xl font-semibold'>{`${Props.depart}의 ${Props.title}`}</p>
      </div>
      <div className='flex justify-center bg-white/80 w-[112rem] h-[48rem]'>
        <HostVideoToGuest />
        <div className='self-start flex flex-col justify-center items-center ml-4'>
          <GuestState curRole={Props.curRole} />
          <StateButtonGrid
            client={Props.client}
            userId={Props.userId}
            roomId={Props.roomId}
          />
        </div>
      </div>
    </>
  );
}
