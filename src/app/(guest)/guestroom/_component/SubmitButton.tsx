import { useRouter } from 'next/navigation';
import Image from 'next/image';
import planetIcon from '@/../public/YellowPlanetIcon.png';
import { PlayIcon } from '@heroicons/react/24/solid';
import { registerGuest } from '@/api/guest';

type Props = {
  nickname: string;
  isValid: boolean;
};

export default function SubmitButton({ nickname, isValid }: Props) {
  const router = useRouter();

  const onSubmit = () => {
    console.log(nickname);
    isValid ? callRegisterGuest() : console.log('유효하지 않은 닉네임');
  };

  const callRegisterGuest = async () => {
    try {
      const address = getAddress();
      if (address === null) throw new Error('유효하지 않은 주소');

      const registrationResult = await registerGuest(nickname, address);
      console.log('게스트 등록 성공', registrationResult);

      router.push(
        `/playroom/${address}?guestid=${registrationResult.data.guestId}`
      );
    } catch (error) {
      console.error('게스트 등록 실패', error);
    }
  };

  const getAddress = () => {
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const address = urlParams.get('address');

    return address;
  };

  return (
    <button
      type='button'
      className='relative z-0 bg-white hover:bg-gray-100 rounded-[4rem] w-auto h-32 ml-20 shadow group'
      onClick={onSubmit}
    >
      <div className='flex items-center ml-20 mr-8'>
        <p className='text-4xl text-highlight font-extrabold tracking-wide'>
          가자!
        </p>
        <PlayIcon className='fill-main size-6 ml-2' />
      </div>
      <div className='absolute bottom-3 left-[-4.5rem] group-hover:animate-bounce'>
        <Image src={planetIcon} width={90} height={90} alt='방 생성 버튼' />
      </div>
    </button>
  );
}
