'use client'

import Video from '../_component/Video'

type Props = {
  params: {
    id: string
  }
}

export default function Page({ params: { id } }: Props) {
  return (
    <div className='absolute top-0 flex justify-center bg-black/40 size-full z-50'>
      <div className='relative top-28 bg-background background rounded-2xl w-[110rem] h-[64rem]'>
        <Video id={id}/>
      </div>
    </div>
  )
}

