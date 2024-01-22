import React from 'react'
import '../page.css'
import Hostleftbox from './leftbox/Hostleftbox'

import Hostmiddlebox from './middlebox/Hostmiddlebox'
import Hostrightbox from './rightbox/Hostrightbox'
import Image
 from 'next/image'
export default function bottomhost() {
  return (
    <div className='bottomcontainer'>

        <div className='grid grid-cols-5'>
            <Hostleftbox />
            <Hostmiddlebox />
            <Hostrightbox />

        </div>
    </div>

  )
}
