import * as StompJs from '@stomp/stompjs';

type Props = {
  client: StompJs.Client;
  userId: string;
  roomId: string;
};

export default function StateButtonGrid(props: Props) {
  const stateButtonclass =
    'bg-main/30 hover:bg-main/60 rounded-3xl w-[22rem] h-[14rem] shadow';

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
    <div className='grid grid-cols-2 gap-4 content-center m-2'>
      <button onClick={() => Alert(201)} className={stateButtonclass}>
        <div>
          선생님
          <p>할 말 있어요</p>
        </div>
      </button>
      <button onClick={() => Alert(202)} className={stateButtonclass}>
        <div>
          화장실에
          <p>가고 싶어요</p>
        </div>
      </button>
      <button onClick={() => Alert(203)} className={stateButtonclass}>
        <div>
          저는
          <p>준비됐어요</p>
        </div>
      </button>
      <button onClick={() => Alert(204)} className={stateButtonclass}>
        <div>
          응급상황!
          <p>확인해 주세요</p>
        </div>
      </button>
    </div>
  );
}
