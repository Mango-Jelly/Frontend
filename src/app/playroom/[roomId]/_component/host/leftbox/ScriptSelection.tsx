'use client'
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
    name : '신데렐라',
  },
  {
    name : '엄마',
  },
  {
    name : '마법사',
  },
  {
    name : '왕',
  },
  {
    name : '왕자',
  },
]


export default function ScriptSelection(Props : Props) {
  const [rolestates, setRolsestates]  = useState<UserRoleState[]>([])
  const [selectedRolestates, setSelectedRolestates] = useState(new Array(rolestates.length).fill(rolestates[0]));
  const [availableRolestates, setAvailableRolestates] = useState([...rolestates]);
  // const RoleStates = useRef<UserRoleState[]>([])
  function sendRoles(role : string, index : number) {
    if (rolestates[index].isSelected) {
      alert('이미 선택된 친구에요')
      return;
    }
    setRolsestates(function (array) {
      let narray : UserRoleState[] = array.map((arg, idx) => {
        if (idx === index) {
          arg.isSelected = true
        }
        return arg
      })
      // narray[index].isSelected = true
      // console.log(narray)
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
                sendRoles(role.name, Number(e.target.value))
              }}
                value={'아이를 선택하세요'}
              >
                <option value={0}>아이를 선택하세요</option>
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