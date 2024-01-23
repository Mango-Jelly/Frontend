import style from './video.module.css'

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

