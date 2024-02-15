import style from './video.module.css';

type Props = {
  address: string;
};

const VideoViewer = async ({ address }: Props) => {
  return (
    <video className={style.video} controls autoPlay>
      <source src={address} type='video/mp4' />
    </video>
  );
};

export default VideoViewer;
