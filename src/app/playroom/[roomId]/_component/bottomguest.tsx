import React from 'react'
import './page.css'
import Image
 from 'next/image'
import Bottomguestright from './bottomguestright'
import Bottomguestleft from './bottomguestleft'


export default function bottomguest() {
  return (
    <div className='bottomcontainer bg-white'>
        <div className='grid grid-cols-2 '>
            <Bottomguestleft />
            <Bottomguestright />
        </div>
    </div>

  )
}
