import Image from 'next/image';
import pinIcon from '@/../public/YellowPinIcon.png';
import VideoIcon from '@/../public/VideoIcon.svg';
import VideoOffIcon from '@/../public/VideoOffIcon.svg';
import MicIcon from '@/../public/MicIcon.svg';
import MicOffIcon from '@/../public/MicOffIcon.svg';

type Props = {
  isCameraOn: boolean;
  setCameraOn: React.Dispatch<React.SetStateAction<boolean>>;
  isAudioOn: boolean;
  setAudioOn: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function VideoControlButtons({
  isCameraOn,
  setCameraOn,
  isAudioOn,
  setAudioOn,
}: Props) {
  const toggleCamera = () => {
    setCameraOn((prev) => !prev);
  };

  const toggleAudio = () => {
    setAudioOn((prev) => !prev);
  };

  const controlButtonClass =
    'rounded-[2rem] bg-main px-6 py-2 m-1 hover:bg-maindark';

  return (
    <div className='flex flex-col'>
      <div className='flex items-center mb-4'>
        <Image
          src={pinIcon}
          width={24}
          height={28}
          alt='카메라/마이크 설정'
          className='-scale-x-100 -rotate-12'
        />
        <p className='text-3xl font-medium ml-2'>카메라/마이크 설정</p>
      </div>
      <div>
        <button onClick={toggleCamera} className={controlButtonClass}>
          {isCameraOn ? (
            <Image src={VideoIcon} width={32} height={32} alt='카메라 끄기' />
          ) : (
            <Image
              src={VideoOffIcon}
              width={32}
              height={32}
              alt='카메라 켜기'
            />
          )}
        </button>
        <button onClick={toggleAudio} className={controlButtonClass}>
          {isAudioOn ? (
            <Image src={MicIcon} width={32} height={32} alt='마이크 끄기' />
          ) : (
            <Image src={MicOffIcon} width={32} height={32} alt='마이크 켜기' />
          )}
        </button>
      </div>
    </div>
  );
}
