"use server";

import { redirect } from "next/navigation";
import { signIn } from "@/auth";

const signUp = async (prevState: any, formData: FormData) => {
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

  let shouldRedirect = false;

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

    console.log(response.status);

    if (response.status === 400) {
      return { message: 'user_exists' };
    }

    console.log(await response.json())
    
    shouldRedirect = true;
    
    await signIn("credentials", userSignUpData);
    
  } catch (err) {
    console.error(err);
    return { message: "회원가입은 성공했으나, 로그인에 실패했습니다. 다시 로그인해주세요."};
  }

  if (shouldRedirect) {
    redirect('/');
  }

  return { message: null };
}

export default signUp;