import style from './video.module.css'

// TODO : props로 상위 컴포넌트에서 비디오 링크 전달
const VideoViewer = async () => {
    return (
        <video className={style.video} controls autoPlay>
            <source src="https://mongo-jelly.s3.ap-northeast-2.amazonaws.com/frontSampleVideo.mp4" type="video/mp4" />
        </video>
    )
}

export default VideoViewer;