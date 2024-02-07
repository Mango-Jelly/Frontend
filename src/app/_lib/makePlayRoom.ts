"use server";

import { createPlayRoom } from '../../api/room'

const makePlayRoom = async (formData: any) => {
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const nickname = formData.get('nickname');

    if (!nickname || !(nickname as string)?.trim() || (nickname as string)?.length < 2 || (nickname as string)?.length > 10) {        
        return { message: 'invalid_nickname' };
    }    

    if ((!email || !(email as string)?.trim())){
        return { message: 'invalid_email' };
    }
    
    if (!password || !(password as string)?.trim()  || (password as string)?.length < 8 || (password as string)?.length > 20){
        return { message: 'invalid_password' };
    }

    if (confirmPassword !== password) {
        return { message: 'password_not_match' };
    }

const userInputData : any = {};
formData.forEach((value: any, key: string | number) => userInputData[key] = value);

  try {
    const response = await createPlayRoom(userInputData);
    
    if (response.status === 400) {
      return { message: 'user_exists' };
    }


  } catch (e) {
    throw e;
  } 

  return { message: null };
}

export default makePlayRoom;