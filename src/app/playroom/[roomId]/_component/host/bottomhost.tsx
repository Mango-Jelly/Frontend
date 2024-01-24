import React from 'react'
import '../page.css'
import Hostleftbox from './leftbox/Hostleftbox'

import Hostmiddlebox from './middlebox/Hostmiddlebox'
import Hostrightbox from './rightbox/Hostrightbox'
import Image
 from 'next/image'


type UserStatus = {
  name : string
  status : number
}

 type Props = {
  ENTRY : UserStatus[]
 }


export default function bottomhost(Props : Props) {
  
  return (
    <div className='bottomcontainer'>

        <div className='grid grid-cols-5'>
            <Hostleftbox />
            <Hostmiddlebox />
            <Hostrightbox 
             ENTRY = {Props.ENTRY}
            />
        </div>
    </div>

  )
}
