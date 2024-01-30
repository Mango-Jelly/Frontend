import React from 'react'
import { useState, useRef } from 'react';
import { useEffect } from "react";
import Actors from './Actor'

type UserStatus = {
  name : string
  status : number
}

type Props = {
  ENTRY : UserStatus[]
  client : any
  roomId : string
}

type UserRoleState = {
  name : string
  isSelected : boolean
}

const given_actors = [
  {
    name : '장고 프리맨',
  },
  {
    name : '닥터 킹 슐츠',
  },
  {
    name : '무슈 캔디',
  },
  {
    name : '브룸힐다 폰 샤프트',
  },
  {
    name : '스티븐 워렌',
  },
]


export default function ScriptSelection(Props : Props) {
  const [rolestates, setRolsestates]  = useState<UserRoleState[]>([]) 
  // const RoleStates = useRef<UserRoleState[]>([])
  function sendRoles(role : string, index : number) {
    if (rolestates[index].isSelected) {
      alert('이미 선택된 친구에요')
      return;
    }
    setRolsestates(function (array) {
      let narray : UserRoleState[] = array
      narray[index].isSelected = true
      console.log(narray)
      return narray
    })
    // RoleStates.current[index].isSelected = true
    const message = {
      code : 300,
      name : rolestates[index].name,
      role : role
    };
    // console.log(RoleStates.current)
    Props.client.publish({
      destination: `/sub/channel/${Props.roomId}`,
      body: JSON.stringify(message),
  })
  }

  useEffect(() => {
    setRolsestates(Props.ENTRY.map((entry) => {
      let tmpState : UserRoleState = {
        name : entry.name,
        isSelected :  false
      }
      return tmpState
    }))

    // RoleStates.current = Props.ENTRY.map((entry) => {
    //   let tmpState : UserRoleState = {
    //     name : entry.name,
    //     isSelected :  false
    //   }
    //   return tmpState
    // })

  }, [Props.ENTRY])

  return (
    <div className='h-2/5  bg-white rounded-md mb-5 p-5'>

    <div>
      <h1>역할 정하기</h1>
    </div>
      <div className=' overflow-auto scroll-auto p-5 h-4/5 '>
        {
          given_actors.map((role, id) => (
            <span className='flex justify-between' key={id}>
              <Actors 
                key={id}
                name = {role.name}
              />
              <select
              className=" border text-sm rounded-lg block w-1/3 p-2.5 "
              id={`roleSelect_${id}`}
              onChange={(e) => {
                console.log()
                sendRoles(role.name, Number(e.target.value))}}
              >
                <option selected>아이를 선택하세요</option>
                {rolestates.map(
                  (state, id) => (
                    <option 
                      className = {state.isSelected ? 'bg-gray-500' : ''}
                      key={id}
                      value={id}
                      disabled={state.isSelected}
                    >{state.name}</option>
                  )
                )}
              </select>
            </span>
            ))
          
        }
      </div>  
    </div>
  )
}