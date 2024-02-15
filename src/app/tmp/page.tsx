'use client'
import React from 'react'
import axios from 'axios';
import Link from "next/link"
import * as StompJs from "@stomp/stompjs"
import { OpenVidu } from 'openvidu-browser';
import { useRouter } from 'next/navigation'
import TmpRouter from './_component/TmpRouter'
 


export default function page() {

  return (
    <TmpRouter />
  )
}
