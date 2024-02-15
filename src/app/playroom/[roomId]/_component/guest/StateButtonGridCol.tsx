import Image from 'next/image';
import status201 from '@/../public/status201.svg';
import status202 from '@/../public/status202.svg';
import status203 from '@/../public/status203.svg';
import status204 from '@/../public/status204.svg';

import * as StompJs from '@stomp/stompjs';

type Props = {
  client: StompJs.Client;
  userId: string;
  roomId: string;
};

export default function StateButtonGrid(props: Props) {
  const stateButtonclass =
    'relative bg-gray-100 hover:bg-main rounded-3xl w-[22rem] h-[14rem] shadow group';
  const buttonTextClass =
    'text-left text-4xl font-bold leading-tight group-hover:text-white';

  function Alert(alarm: number) {
    const message = {
      code: alarm,
      id: props.userId,
    };
    props.client.publish({
      destination: `/sub/channel/${props.roomId}`,
      body: JSON.stringify(message),
    });
  }

  return (
    <div className='flex flex-col justify-start align-middle content-center m-2'>
      <button onClick={() => Alert(201)} className={stateButtonclass}>
        <Image
          src={status201}
          width={200}
          height={200}
          alt=''
          className='absolute top-3 right-3 size-48'
        ></Image>
        <div className='absolute top-[5rem] left-6'>
          <p className={buttonTextClass}>
            선생님
            <br />할 말 있어요
          </p>
        </div>
      </button>
      <button onClick={() => Alert(202)} className={stateButtonclass}>
        <Image
          src={status202}
          width={200}
          height={200}
          alt=''
          className='absolute top-4 left-0 size-48'
        ></Image>
        <div className='absolute top-[2rem] right-6'>
          <p className={buttonTextClass}>
            화장실에
            <br />
            가고 싶어요
          </p>
        </div>
      </button>
      <button onClick={() => Alert(203)} className={stateButtonclass}>
        <Image
          src={status203}
          width={200}
          height={200}
          alt=''
          className='absolute top-3 left-6 size-48'
        ></Image>
        <div className='absolute top-[2.5rem] right-6'>
          <p className={buttonTextClass}>
            저는
            <br />
            준비됐어요
          </p>
        </div>
      </button>
      <button onClick={() => Alert(204)} className={stateButtonclass}>
        <Image
          src={status204}
          width={200}
          height={200}
          alt=''
          className='absolute top-4 right-3 size-48'
        ></Image>
        <div className='absolute top-[4.5rem] left-6'>
          <p className={buttonTextClass}>
            응급상황!
            <br />
            확인해 주세요
          </p>
        </div>
      </button>
    </div>
  );
}
