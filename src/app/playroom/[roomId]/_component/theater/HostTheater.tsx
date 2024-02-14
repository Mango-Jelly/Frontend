'use client'
import { useRef, useEffect, useCallback, useState } from "react";
import style from './scrollbar.module.css'
import { ControllScript } from './ControllScript'
import Image, { StaticImageData } from 'next/image'
import CookieHouse from '@/../public/CookieHouse.png'
import {
  PlayCircleIcon,
  PauseCircleIcon,
  StopCircleIcon,
} from '@heroicons/react/24/solid'
import ForestJpeg from '@/../public/ForestJpeg.jpg'
import cinderella from '@/../public/cinderella.jpg'
import { OpenVidu, Stream, Subscriber } from 'openvidu-browser';
import GuestStateSection from '../host/rightbox/GuestStateSection'
import { scriptInfo } from './data/Dummy'
import axios from 'axios'
import VideoIcon from '@/../public/VideoIcon.svg';
import VideoOffIcon from '@/../public/VideoOffIcon.svg';
import MicIcon from '@/../public/MicIcon.svg';
import MicOffIcon from '@/../public/MicOffIcon.svg';



type UserStatus = {
  name: string
  status: number
  role : string
  camera : Subscriber | null
}


type Props = {
  client : any
  roomId : string
  streamManager : any;
  ENTRY: UserStatus[]
}

interface HTMLMediaElementWithCaptureStream extends HTMLMediaElement{
  captureStream(): MediaStream;
}

export default function HostTheater(Props : Props) {
  let idx = 0
  const [actor, setActor] = useState<UserStatus[]>([])
  const { script, curIdx, refs, moveScript } = ControllScript()
  const getDynamicClass = (sceneKey: number, dialogKey: number) =>
  {
    if (sceneKey === curIdx.scene && dialogKey === curIdx.dialog)
    {
      return 'rounded-xl border-8 border-main font-semibold p-2'
    }
  }
  const [isRecording, setIsRecording] = useState<boolean>(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const backgroundImage = useRef<HTMLImageElement>(null)
  const actorDom = useRef<HTMLVideoElement[]>([])
  const controlButtonClass =
  'rounded-[2rem] bg-main px-6 py-2 m-1 hover:bg-maindark';
  const isNewscene = useRef<boolean>(false)
  const arrVideoData = useRef<BlobPart[]>([])
  const arrAudioData = useRef<BlobPart[]>([])
  const mediaRecorder = useRef<MediaRecorder>()
  const mediaRecorder2 = useRef<MediaRecorder>()


  const mapping = useRef<Map<string, any | null>> (new Map())
  // const audioCamera = useRef<Subscriber | null | undefined> (mapping.current.get(script.scene[curIdx.scene].dialogs[curIdx.dialog].role))
  // const [Image, setImage] = useState<any>(null)
  const ffmpeg = new FFmpeg();

  
  const [isCameraOn, setCameraOn] = useState(true);
  const [isAudioOn, setAudioOn] = useState(true);

  const toggleCamera = () => {
    setCameraOn((prev) => !prev);
  };

  const toggleAudio = () => {
    setAudioOn((prev) => !prev);
  };

  function goNext() {
    const message = {
            code: 500,
          };
    Props.client.publish({
        destination: `/sub/channel/${Props.roomId}`,
        body: JSON.stringify(message),
    })
    moveScript()    
  }

  useEffect(
    () =>
    {
    isNewscene.current = true
    let roles = new Set();

    script.scenes[curIdx.scene].dialogs.forEach(element => {
      roles.add(element.role)
    });
      actorDom.current = []
      actorDom.current.length = roles.size
      const canvas = canvasRef.current

      if (canvas && backgroundImage.current)
      {
        canvas.width = backgroundImage.current.width
        canvas.height = backgroundImage.current.height
        let ctx = canvas.getContext('2d');
        if (ctx)
        {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
        }
      }
    
      setActor(Props.ENTRY.filter(element => roles.has(element.role)));
      setTimeout(() => {
        isNewscene.current = false
      }, 300)
    }
    , [curIdx.scene])
  
  useEffect(
    () => {
      const canvas = canvasRef.current

      mapping.current.clear()
      if (canvas) {
      let cameraSize = canvas.width / (actorDom.current.length + 1)
      let cameraGap = cameraSize / (actorDom.current.length + 1)

        let ctx = canvas.getContext('2d')
        if (ctx && backgroundImage.current)
        {
          ctx.drawImage(backgroundImage.current, 0, 0, canvas.width, canvas.height);
          setTimeout(() => {
            if (ctx) {
              setTimeout(() => {
                actor.forEach((element, id) => {
                    if (element.camera && actorDom.current[id]) {
                      while (!actorDom.current[id] === null) { continue }
                    if (element && actorDom.current[id]) {
                        element.camera.addVideoElement(actorDom.current[id]);
                        mapping.current.set(element.role, element.camera)
                      }
                    }
                });
        
                actorDom.current.forEach(
                  (element, id) => {
                    (function loop() {
                        if (isNewscene.current) {
                            return;
                        }
                        if (ctx && element)
                        ctx.drawImage(
                            element,
                            cameraGap * (id + 1) + cameraSize * id,
                            50,
                            cameraSize,
                            (cameraSize * 9) / 16
                        );
                        setTimeout(loop, 1000 / 30); // drawing at 30fps
                    })();
                    });
                }, 2000);
            }
        }, 300);
        }
      }
    }
    , [actor])


//   const convertMedia = async () => {
//     await ffmpeg.load();
//     const video = await videoFileRef.current.files[0].arrayBuffer();
//     const audio = await audioFileRef.current.files[0].arrayBuffer();

// await ffmpeg.writeFile("video.mp4", new Uint8Array(video));
// await ffmpeg.writeFile("audio.mp3", new Uint8Array(audio));

// await ffmpeg.exec([
//   "-i",
//   "video.mp4",
//   "-i",
//   "audio.mp3",
//   "-c:v",
//   "copy",
//   "-c:a",
//   "aac",
//   "-strict",
//   "experimental",
//   "output.mp4",
// ]);
// const data = await ffmpeg.readFile("output.mp4");
// const videoBlob = new Blob([data.buffer], { type: "video/mp4" });
// getChildShorts(videoBlob, musicRoot);
// // const videoUrl = URL.createObjectURL(videoBlob);
// // const link = document.createElement("a");
// // link.href = videoUrl;
// // link.download = "output.mp4";
// // link.click();
//   };


  function reload() {
    const canvas = canvasRef.current
    if (canvas && backgroundImage.current)
    {
      canvas.width = backgroundImage.current.width
      canvas.height = backgroundImage.current.height
      let ctx = canvas.getContext('2d');
      console.log('해상도 비교', backgroundImage.current?.width, canvas?.width)
      if (ctx)
      {
        ctx.drawImage(backgroundImage.current, 0, 0, canvas.width, canvas.height);
      }
    }
  }
  

  // 녹화 시작한다
  function startRecording() {

    setIsRecording(true)
      console.log('녹화 시작')

    const mediaStream = canvasRef.current?.captureStream()
    

    const options = {
        audioBitsPerSecond: 0,
        videoBitsPerSecond: 2500000,
        // mimeType: "video/webm",
      };
    // const audioStream =
    const speechVideo = mapping.current.get(script.scenes[curIdx.scene].dialogs[curIdx.dialog].role)
    if (speechVideo)
    {
      // const mediaStream2 = speechVideo.captureStream()
      // console.log(speechVideo.stream.getMediaStream().getAudioTracks())
      const audioTrack = speechVideo.stream.getMediaStream().getAudioTracks()

      const mediaStream2 = new MediaStream()
      mediaStream2.addTrack(audioTrack[0])
      
      console.log(script.scenes[curIdx.scene].dialogs[curIdx.dialog].role)

      if (mediaStream) {
        mediaRecorder.current = new MediaRecorder(mediaStream, options)
        mediaRecorder2.current = new MediaRecorder(mediaStream2)


        mediaRecorder.current.ondataavailable = (event) =>
        {
          // 스트림 데이터(Blob)가 들어올 때마다 배열에 담아둔다.
          console.log(event.data)
          arrVideoData.current.push(event.data);
        }
        mediaRecorder2.current.ondataavailable = (event) => {
          arrAudioData.current.push(event.data)
        }
        
        mediaRecorder.current.onstop = (event)=>{
            // 들어온 스트림 데이터들(Blob)을 통합한 Blob객체를 생성
            const blob = new Blob(arrVideoData.current);
            // BlobURL 생성: 통합한 스트림 데이터를 가르키는 임시 주소를 생성
            const blobURL = window.URL.createObjectURL(blob);
            // 다운로드 구현
            const $anchor = document.createElement("a"); // 앵커 태그 생성
            document.body.appendChild($anchor);
            $anchor.style.display = "none";
            $anchor.href = blobURL; // 다운로드 경로 설정
            $anchor.download = "test.webm"; // 파일명 설정
            $anchor.click(); // 앵커 클릭
            
            // 배열 초기화
            arrVideoData.current.splice(0);
        }
        mediaRecorder2.current.onstop = (event) => {
          const blob = new Blob(arrAudioData.current, { 'type' : 'audio/mp3' });
          const audioURL = window.URL.createObjectURL(blob);
          const b = document.createElement('a');
          b.href = audioURL;
          b.download = 'audio.mp3';
          b.click();
          arrAudioData.current.splice(0)
        }
            // 녹화 시작
            mediaRecorder.current.start();
            mediaRecorder2.current.start();
    }
    }
  }

  // useEffect(
  //   () => {
  //     axios.get(
  //       'https://mangotail.shop/api/v1/script',
  //       {params : {scriptId : 2}},
  //     ).then((res) => {
  //       console.log(res)
  //       script = res.data
  //     }) .catch ((e) => {console.log(e)})
    
  //   }
  //   , []
  // )

  return (
    <div className='flex h-full w-fit relative justify-between p-[2rem]'>
      <div className='bg-white m-4 h-full'>
        <div className='flex items-center m-4'>
          <Image
            src={CookieHouse}
            width={24}
            height={24}
            alt='현재 연극 대본'
          />
          <p className='text-3xl'>현재 연극 대본</p>
        </div>


        <div
          className='overflow-auto w-[30rem] h-[50rem]  p-4'
          id={style.scroll}
        >
          
            {script.scenes.map((sceneValue, sceneKey) => {
              return (
                <div key={sceneKey}>
                  <p className='sticky top-0 text-lg bg-gray-100 p-2 my-2'>
                    {`${sceneValue.seq}번째 씬`}
                  </p>
                  {sceneValue.dialogs.map((dialogValue, dialogKey) => {
                    return (
                      <div
                        key={dialogKey}
                        ref={(element) => {
                          refs.current[idx++] = element
                        }}
                        className={`flex items-center py-2 ${getDynamicClass(sceneKey, dialogKey)}`}
                      >
                        <div className='shrink-0 bg-gray-200 rounded-full size-12 m-2'>
                          {dialogValue.img}
                        </div>
                       
                          {
                            
                          }
                          {
                            dialogValue.roles
                            ?
                            <p className='text-xl'> {`${dialogValue.roles[0].roleName}: ${dialogValue.dialog}`}</p>
                            :
                            <p className='text-xl'> {`${dialogValue.role}: ${dialogValue.dialog}`} </p>
                          }
                        
                      </div>
                    )
                  })}
                </div>
              )
            })}

        </div>
        
      </div>

      <div className='w-[96rem] h-[54rem] relative'>
        <div className='w-full justify-center relative h-full'>
            <Image
              src = {ForestJpeg}
              alt='배경화면'
              className='h-full w-full  z-0 rounded-2xl'
              ref={backgroundImage}
            />
          <canvas ref={canvasRef}  style={{ width : '100%', height : '100%'}} className="z-10 absolute top-0 left-0 rounded-2xl"></canvas>

          
          {
            Props.streamManager ?
              <div className='absolute top-0 left-0 p-[3rem]  w-full h-full grid grid-cols-4 gap-4 flex z-0'>
              {
                actor.map((actor, id) => {
                  return (
                    // <div className="z-10 w-full self-end" key = {id} ref = {(element) => {actorDom.current[id] = element}} hidden>
                    //   <OpenViduVideoComponent streamManager={actor.camera} />
                    // </div>
                    <video key={actor.name} autoPlay={true} ref={(element) => {
                      if (element) { actorDom.current[id] = element }
                    }} className='z-10 w-full rounded-2xl' hidden />
                  )
                })
              }
            </div>
            :
            <div className='absolute top-0 left-0 p-[3rem]  w-full h-full'>
              <video controls muted className=' z-10 w-[40rem] h-[30rem]'  >
                <source src="https://mongo-jelly.s3.ap-northeast-2.amazonaws.com/frontSampleVideo.mp4" type="video/mp4" className='z-10'/>
              </video>
            </div>
          }
        </div>
        
        <div className='flex flex-row justify-between px-[5rem] py-[1rem]'>
              <div id = "leftbox" className='flex flex-row'>
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
                  <button onClick={goNext}>
                    <PlayCircleIcon className='size-20' />
                  </button>
                  <button>
                    <PauseCircleIcon className='size-20' />
                  </button>
            <button onClick={() => {
                    reload()
                    }}> 
                    <StopCircleIcon className='size-20' />
                  </button>
              </div>
              <div className='flex flex-row'>
              </div>
              <div id = "rightbox" className='flex flex-row '>
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:bg-blue-800 font-medium rounded-full text-xl px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:bg-blue-800">종료하기</button>
            
            {
              isRecording ?
                <button type="button" onClick=
                  {() => {
                    setIsRecording(false)
                    mediaRecorder.current?.stop()
                    mediaRecorder2.current?.stop()
                  }} className="text-white bg-blue-700 hover:bg-blue-800 focus:bg-blue-800 font-medium rounded-full text-xl px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:bg-blue-800">녹화 멈추기</button>
                :
                <button type="button" onClick={() => { startRecording() }} className="text-white bg-blue-700 hover:bg-blue-800 focus:bg-blue-800 font-medium rounded-full text-xl px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:bg-blue-800">녹화 하기</button>
            }
              </div>
            </div>
        </div>
        <div className = 'w-1/5 h-full'>
        <GuestStateSection
                ENTRY = {Props.ENTRY}
              />
        </div>

    </div>
  )
}
