import Image from 'next/image';
import cloudImg from '@/../public/cloudImg.svg';
import cloudGrayImg from '@/../public/cloudGrayImg.svg';
import starImg from '@/../public/starImg.svg';
import moonImg from '@/../public/moonImg.svg';

export default function BackgroundAnimation() {
  const cloudClasses = [
    'top-[6.5rem] right-[8rem] size-40 hover:animate-changeOpacity',
    'top-[28rem] left-[6rem] size-20',
    'top-[30rem] right-[4rem] size-16',
  ];

  const cloudGrayClasses = [
    'top-[36rem] left-[2rem] size-16',
    'top-[40rem] right-[8rem] size-28',
    'top-[58rem] left-[6rem] size-28',
  ];

  const starClasses = [
    'top-[2rem] -right-[1.5rem] size-20 animate-slowYMovement-4s',
    'top-[8rem] -left-[3rem] size-36 animate-slowYMovement-4s',
    'top-[28.5rem] right-[8rem] size-10 animate-slowXMovement-6s',
  ];

  const moonClasses = [
    'top-[6rem] left-[5.5rem] size-12 animate-slowYMovement-4s',
  ];

  return (
    <div>
      <div className='opacity-40'>
        {cloudClasses.map((cloudClass, index) => (
          <Image
            key={index}
            src={cloudImg}
            width={100}
            height={100}
            alt='cloud'
            className={`absolute animate-slowXMovement-6s  ${cloudClass}`}
          />
        ))}
      </div>
      <div className='opacity-40'>
        {cloudGrayClasses.map((cloudGrayClass, index) => (
          <Image
            key={index}
            src={cloudGrayImg}
            width={100}
            height={100}
            alt='cloud'
            className={`absolute animate-slowXMovement-10s ${cloudGrayClass}`}
          />
        ))}
      </div>
      <div className='opacity-40'>
        {starClasses.map((starClass, index) => (
          <Image
            key={index}
            src={starImg}
            width={100}
            height={100}
            alt='star'
            className={`absolute ${starClass}`}
          />
        ))}
      </div>
      <div className='opacity-40'>
        {moonClasses.map((moonClass, index) => (
          <Image
            key={index}
            src={moonImg}
            width={100}
            height={100}
            alt='moon'
            className={`absolute ${moonClass}`}
          />
        ))}
      </div>
    </div>
  );
}
