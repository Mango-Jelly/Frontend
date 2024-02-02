import React from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation'


export default function TmpRouter() {
    const router = useRouter()
    const createSession = async () => {

        const response = await axios.post( '/openvidu/api/sessions/', {
          headers: {
            'Authorization' : 'Basic T1BFTlZJRFVBUFA6bWFuZ28=',
            'Content-Type': 'application/json',
          },
          // data : body,
        }
        );
        // setMySessionId(response.data.sessionId);
        // setToken(response.data.);
        return response.data.sessionId; // The sessionId
      };

  return (
    <div><button onClick={ () => {createSession().then((sessionId) => 
        {router.push(`http://localhost:3000/playroom/${sessionId}`)}
    )}} className='h-[150rem] w-[150rem] text-white bg-blue-700 hover:bg-blue-800 focus:bg-blue-800 font-medium rounded-full text-xl px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:bg-blue-800'>가즈아</button></div>

  )
}
