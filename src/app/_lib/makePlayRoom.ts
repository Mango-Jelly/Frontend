"use server";

import { auth } from '@/auth';
import { createPlayRoom } from '../../api/room'
import { Auth } from '@auth/core';

const makePlayRoom = async (formData: any) => {
    const session = await auth();

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

userInputData['Authorization'] = session?.Authorization;

  try {
    const response = await createPlayRoom(userInputData);
    
    if (response.status === 400) {
      return { message: 'failure make room' };
    }


  } catch (e) {
    throw e;
  } 

  return { message: null };
}

export default makePlayRoom;