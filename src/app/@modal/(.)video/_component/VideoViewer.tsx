import style from './video.module.css'

// TODO : props로 상위 컴포넌트에서 비디오 링크 전달
const VideoViewer = async () => {
    return (
        <video
            className={style.video}
            controls
            src={require("../../../../../public/dummyVideo.mp4")}
        />
    )
}

export default VideoViewer;

