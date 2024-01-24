import React from 'react'
import '../page.css'
import Hostleftbox from './leftbox/hostleftbox'

import Hostmiddlebox from './middlebox/hostmiddlebox'
import Hostrightbox from './rightbox/hostrightbox'
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
