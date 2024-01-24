import React from 'react'
import Image
 from 'next/image'
import piggie from '@/../public/piggie.svg'
import Actors from './Actors'



type Role = {
  name : string
}


function actors(role : Role) {
  return (
    <div className=' '>
      
      <div className='rounded-md p-3 bg-gray'>
        <p className='text-gray-700 dark:text-gray-400'>{role.name}</p>
      </div>

    </div>
  )
}

export default function hostleftBottomcomponent() {


  const given_actors = [
    {
      name : '신데렐라',
    },
    {
      name : '신데렐라',
    },
    {
      name : '신데렐라',
    },
    {
      name : '신데렐라',
    },
    {
      name : '신데렐라',
    },
  ]


  return (
    <div className='h-2/5  bg-white rounded-md mb-5 p-5'>

    <div>
      <h1>역할 정하기</h1>
    </div>
      <div className=' overflow-auto scroll-auto p-5 h-4/5 '>
        {
          given_actors.map((role, id) => (

            <Actors 
              key={id}
              name = {role.name}
            />
            ))
          
        }
      </div>  
    </div>
  )
}