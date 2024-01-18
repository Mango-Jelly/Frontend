import React from 'react'
import './page.css'
import Hostleftbox from './hostleftbox.tsx'
import Hostmiddlebox from './hostmiddlebox.tsx'
import Hostrightbox from './hostrightbox.tsx'
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
