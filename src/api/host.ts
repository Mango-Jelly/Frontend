import { memberAPI } from './baseInstance';

export const login = async (email :string, password :string) => {
    const response = await memberAPI.post(`/login`,{
         "email": email,
         'password' : password
     }, {
         headers: {
             "Content-Type": "application/json",
         },
     });
     return response.data;
 }
 
 export const signup = async (email :string, password :string, nickName :string) => {
     const response = await memberAPI.post(`/signup`,{
         "email": email,
         'password' : password,
         'nickName' : nickName
     }, {
         headers: {
             "Content-Type": "application/json",
         },
     });
     return response.data;
 }