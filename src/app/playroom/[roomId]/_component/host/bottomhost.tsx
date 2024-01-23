import React from 'react'
import '../page.css'
import Hostleftbox from './leftbox/Hostleftbox'

import Hostmiddlebox from './middlebox/Hostmiddlebox'
import Hostrightbox from './rightbox/Hostrightbox'
import Image
 from 'next/image'


 type Props = {
  ENTRY : string[]
 }


export default function bottomhost(Props : Props) {
  
  console.log(Props.ENTRY)


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
