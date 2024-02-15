import React from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation'


export default function TmpRouter() {
  const router = useRouter()
  const RoomId = `${Math.floor(Math.random() * 100)}`
  const body : any = {
    mediaMode: "ROUTED",
    recordingMode: "MANUAL",
    customSessionId: `Room${RoomId}`,
    forcedVideoCodec: "VP8",
    allowTranscoding: false,
    defaultRecordingProperties: {
        name: "MyRecording",
        hasAudio: true,
        hasVideo: true,
        outputMode: "COMPOSED",
        recordingLayout: "BEST_FIT",
        resolution: "1280x720",
        frameRate: 25,
        shmSize: 536870912,
        mediaNode: {
            id: "media_i-0c58bcdd26l11d0sd"
        }
    },
    mediaNode: {
        id: "media_i-0c58bcdd26l11d0sd"
    }
}
    const createSession = async () => {

        const response = await axios.post( '/openvidu/api/sessions/', body,  {
          headers: {
            'Authorization' : 'Basic T1BFTlZJRFVBUFA6bWFuZ28=',
            'Content-Type': 'application/json',
          },
        }
        );
        // setMySessionId(response.data.sessionId);
      // setToken(response.data.);
      console.log(response.data)
        return response.data.sessionId; // The sessionId
      };

  return (
    <div>
      <button onClick={() => {
        // createSession()
        createSession().then((sessionId) => 
        {router.push(`http://localhost:3000/playroom/${sessionId}`)}
        )
      }} className='h-[150rem] w-[150rem] text-white bg-blue-700 hover:bg-blue-800 focus:bg-blue-800 font-medium rounded-full text-xl px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:bg-blue-800'>가즈아</button>
    </div>

  )
}
