import style from './video.module.css';

const VideoViewer = async (address: { address: string }) => {
  return (
    <video className={style.video} controls autoPlay>
      <source src={address} type='video/mp4' />
    </video>
  );
};

export default VideoViewer;
