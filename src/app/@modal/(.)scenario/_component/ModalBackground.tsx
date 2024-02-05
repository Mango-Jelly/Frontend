import Image from 'next/image';
import cloudImg from '@/../public/cloudImg.svg';
import starImg from '@/../public/starImg.svg';
import moonImg from '@/../public/moonImg.svg';

export default function ModalBackground() {
  return (
    <div className=''>
      <div className='opacity-40 z-0'>
        <Image
          src={cloudImg}
          width={72}
          height={72}
          alt='cloud'
          className='absolute top-[1.5rem] -left-[1rem] animate-slowXMovement-10s'
        ></Image>
        <Image
          src={cloudImg}
          width={56}
          height={56}
          alt='cloud'
          className='absolute top-[1rem] left-[28rem] -scale-x-100 animate-slowXMovement-6s'
        ></Image>
        <Image
          src={cloudImg}
          width={52}
          height={52}
          alt='cloud'
          className='absolute bottom-[30rem] right-[0.5rem] animate-slowXMovement-8s'
        ></Image>
        <Image
          src={cloudImg}
          width={56}
          height={56}
          alt='cloud'
          className='absolute bottom-[1rem] left-[38rem] animate-slowXMovement-8s'
        ></Image>
      </div>

      <div className='opacity-50 z-0'>
        <Image
          src={starImg}
          width={24}
          height={24}
          alt='star'
          className='absolute top-[1rem] left-[6.5rem] animate-slowXMovement-10s'
        ></Image>
        <Image
          src={starImg}
          width={50}
          height={50}
          alt='star'
          className='absolute top-[1rem] right-[8rem] rotate-45 animate-wiggle-8s'
        ></Image>
      </div>

      <div className='opacity-50 z-0'>
        <Image
          src={moonImg}
          width={24}
          height={24}
          alt='moon'
          className='absolute top-[26.5rem] right-[0.8rem] -scale-x-100 animate-slowYMovement-4s'
        ></Image>
        <Image
          src={moonImg}
          width={32}
          height={32}
          alt='moon'
          className='absolute bottom-[1.5rem] left-[32.5rem] rotate-12 animate-slowYMovement-4s'
        ></Image>
      </div>
    </div>
  );
}
