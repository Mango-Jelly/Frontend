"use server";

import { auth } from '@/auth';
import { createPlayRoom, deletePlayRoom, getMyPlayRoomInfo } from '../../api/room'
import axios from 'axios';
import { redirect } from 'next/navigation'

type OpenviduSessionBody = {
  mediaMode: string;
  recordingMode: string;
  customSessionId: string;
  forcedVideoCodec: string;
  allowTranscoding: boolean;
  defaultRecordingProperties: {
    name: string;
    hasAudio: boolean;
    hasVideo: boolean;
    outputMode: string;
    recordingLayout: string;
    resolution: string;
    frameRate: number;
    shmSize: number;
    mediaNode: {
      id: string;
    }
  };
  mediaNode: {
    id: string;
  }

}

const makePlayRoom = async (formData: any) => {
  const session: any = await auth();

  const roomName = formData.get('roomName');
  const department = formData.get('department');

  if (!roomName || !(roomName as string)?.trim() || (roomName as string)?.length < 5 || (roomName as string)?.length > 20) {
    return { message: 'invalid_roomName' };
  }

  if ((!department || !(department as string)?.trim())) {
    return { message: 'invalid_departure' };
  }


  const userInputData: any = {};
  formData.forEach((value: any, key: string | number) => userInputData[key] = value);

  userInputData['AccessToken'] = session?.Authorization;
  userInputData.isPublic === "on" ? userInputData.isPublic = true : userInputData.isPublic = false;

  let sessionUUID = "";

  try {
    const { roomName: title, department, isPublic: visible, AccessToken } = userInputData;

    const existCode = await getMyPlayRoomInfo(AccessToken);
    sessionUUID = existCode.data.address;

    if (!sessionUUID) {
      const code = await createPlayRoom({ title, department, visible, AccessToken });

      const openviduSessionBody: OpenviduSessionBody = {
        mediaMode: "ROUTED",
        recordingMode: "MANUAL",
        customSessionId: code.data.address,
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

      const sessionId = await axios.post(`${process.env.OPENVIDU_URL}/openvidu/api/sessions`, openviduSessionBody, {
        headers: {
          'Authorization': 'Basic T1BFTlZJRFVBUFA6bWFuZ28=',
          'Content-Type': 'application/json',
        }
      }
      );
      sessionUUID = sessionId.data.sessionId;
    }

    console.log("오픈비두의 세션아이디는 다음과 같습니다.")
    console.log(sessionUUID);

    if (!sessionUUID) {
      return { message: 'failure_make_room' };
    }
  } catch (e) {
    console.log(e)
  }

  sessionUUID && redirect(`${process.env.LOCAL_URL}/playroom/${sessionUUID}`);

  return { message: null };
}

export default makePlayRoom;