"use server";

import { signIn } from "@/auth";

const signUp = async (formData: FormData) => {
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

const userSignUpData : any = {};
formData.forEach((value, key) => userSignUpData[key] = value);

  try {
    const response = await fetch(`${process.env.BASE_URL}/member/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userSignUpData.email,
        password: userSignUpData.password,
        nickname: userSignUpData.nickname,
      }),
      credentials: 'include',
    })
    
    if (response.status === 400) {
      return { message: 'user_exists' };
    }

    await signIn("credentials", {
      username: userSignUpData.email,
      password : userSignUpData.password,
      redirect: false
    });

  } catch (e) {
    throw e;
  } 

  return { message: null };
}

export default signUp;