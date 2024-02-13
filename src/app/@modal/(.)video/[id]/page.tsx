'use client';

import { useSearchParams } from 'next/navigation';
import Video from '../_component/Video';

type Props = {
  params: {
    id: number;
  };
};

export default function Page({ params: { id } }: Props) {
  const isLogin = useSearchParams().get('isLogin') === 'true';

  return (
    <div className='absolute top-0 flex justify-center bg-black/40 size-full z-10'>
      <div className='relative top-28 bg-background background rounded-2xl w-[110rem] h-[64rem] z-10'>
        <Video id={id} isLogin={isLogin} />
      </div>
    </div>
  );
}
