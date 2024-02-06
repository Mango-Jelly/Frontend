'use client';

import ModalBackground from '../_component/ModalBackground';
import Scenario from '../_component/Scenario';

type Props = {
  params: {
    id: string;
  };
};

export default function Page({ params: { id } }: Props) {
  return (
    <div className='absolute top-0 flex justify-center bg-black/40 size-full z-10'>
      <div className='relative top-28 bg-background background rounded-2xl w-[110rem] h-[64rem] z-10 overflow-hidden'>
        <ModalBackground />
        <Scenario id={id} />
      </div>
    </div>
  );
}
