"use server";

import { auth } from '@/auth';
import { createPlayRoom } from '../../api/room'
import { Auth } from '@auth/core';

const makePlayRoom = async (formData: any) => {
    const session : any = await auth();

    const roomName = formData.get('roomName');
    const department = formData.get('department');

    if (!roomName || !(roomName as string)?.trim() || (roomName as string)?.length < 5 || (roomName as string)?.length > 20) {        
        return { message: 'invalid_roomName' };
    }    

    if ((!department || !(department as string)?.trim())){
        return { message: 'invalid_departure' };
    }


  const userInputData : any = {};
  formData.forEach((value: any, key: string | number) => userInputData[key] = value);

  userInputData['AccessToken'] = session?.Authorization;
  userInputData.isPublic === "on" ? userInputData.isPublic = true : userInputData.isPublic = false;

  try {
    const { roomName:title , department , isPublic:visible, AccessToken } = userInputData;

    const code = await createPlayRoom({ title, department, visible, AccessToken});
    
    console.log('방생성 완료')

    console.log(code.data.address || "이미 존재하는 방입니다");
    // if (response.status === 400) {
    //   return { message: 'failure_make_room' };
    // }
    // if (response.status === 200) {
    //   console.log('방생성 완료')
    //   console.log(response.data)
    // }   

  } catch (e) {
    console.log(e)
  } 

  return { message: null };
}

export default makePlayRoom;