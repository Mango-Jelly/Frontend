import Image from 'next/image';
import cloudImg from '@/../public/cloudImg.svg';
import starImg from '@/../public/starImg.svg';
import moonImg from '@/../public/moonImg.svg';

export default function ModalBackground() {
  return (
    <div className=''>
      <div className='opacity-30 z-0'>
        <Image
          src={moonImg}
          width={50}
          height={50}
          alt='moon'
          className='size-[4rem] absolute top-[14rem] right-[0.8rem] -scale-x-100 animate-slowYMovement-4s'
        ></Image>
        <Image
          src={moonImg}
          width={100}
          height={100}
          alt='moon'
          className='size-[20rem] absolute -bottom-[4rem] right-[14rem] rotate-12 animate-slowYMovement-4s'
        ></Image>
      </div>
      <div className='opacity-30 z-0'>
        <Image
          src={cloudImg}
          width={300}
          height={300}
          alt='cloud'
          className='size-[72rem] absolute top-[16rem] -left-[1rem] animate-slowXMovement-10s'
        ></Image>
        <Image
          src={cloudImg}
          width={300}
          height={300}
          alt='cloud'
          className='size-[48rem] absolute top-[1rem] right-0 -scale-x-100 animate-slowXMovement-6s'
        ></Image>
      </div>

      <div className='opacity-30 z-0'>
        <Image
          src={starImg}
          width={100}
          height={100}
          alt='star'
          className='size-[30rem] absolute top-[0rem] -left-[4rem] animate-slowYMovement-4s'
        ></Image>
        <Image
          src={starImg}
          width={50}
          height={50}
          alt='star'
          className='absolute top-[1rem] right-[8rem] rotate-45 animate-wiggle-8s'
        ></Image>
      </div>
    </div>
  );
}
