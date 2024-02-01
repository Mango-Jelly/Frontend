import Image from 'next/image';
import pinIcon from '@/../public/YellowPinIcon.png';

export default function NicknameInput() {
  return (
    <div>
      <div className='flex items-center mb-3'>
        <Image
          src={pinIcon}
          width={24}
          height={28}
          alt='방 입장 닉네임'
          className='-scale-x-100 -rotate-12'
        />
        <p className='text-3xl font-medium ml-2'>방 입장 닉네임</p>
      </div>
      <input
        type='text'
        placeholder='10자 이내로 닉네임을 입력해 주세요'
        className='text-4xl font-light border rounded-[2rem] w-[38rem] px-6 py-2'
      />
    </div>
  );
}
