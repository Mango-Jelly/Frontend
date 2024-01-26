import React from 'react'
import Image
 from 'next/image'
import piggie from '@/../public/piggie.svg'
import Roles from './Roles'


export default function hostleftTopcomponent() {
  
  const given_roles = [
    {
      img : piggie,
      name : '첫째 돼지',
      actor : ''
    },
    {
      img : piggie,
      name : '첫째 돼지',
      actor : ''
    },
    {
      img : piggie,
      name : '첫째 돼지',
      actor : ''
    },
    {
      img : piggie,
      name : '첫째 돼지',
      actor : ''
    },
    {
      img : piggie,
      name : '첫째 돼지',
      actor : ''
    },
    {
      img : piggie,
      name : '첫째 돼지',
      actor : ''
    },
  ]
  

  return (
    <div className='h-3/5 rounded-md bg-white mb-5 p-5'>
      <div>
        <h1 className='p-5'>연극 대본 고르기</h1>
      </div>
      <div className=' overflow-auto scroll-auto p-5 h-4/5 '>
        {
          given_roles.map((role, id) => 
            (<Roles 
              key = {id}
              img = {role.img}
              name = {role.name}
              actor = {role.actor}
            />)
          )
        }
      </div>  


    </div>

  )
}