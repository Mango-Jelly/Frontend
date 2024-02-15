'use client';

import { useState, useRef } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

// import Actors from '@/app/playroom/[roomId]/_component/host/leftbox/Actor';

import Image from 'next/image';
import img_yellowbear from '@/../public/img_yellowbear.svg';
import style from '../_component/scrollbar.module.css';

type UserStatus = {
  name: string;
  status: number;
};

type Props = {
  ENTRY: UserStatus[];
  client: any;
  roomId: string;
  scriptIdx: number;
};

type UserRoleState = {
  name: string;
  isSelected: boolean;
};

// const given_roles =
// [
//   { roleName: '신데렐라' },
//   { roleName: '엄마' },
//   { roleName: '마법사' },
//   { roleName: '왕' },
//   { roleName: '왕자' },
// ];

export default function MemberRole(props: Props) {
  const [rolestates, setRolsestates] = useState<UserRoleState[]>([]);
  const [given_roles, setGiven_roles] = useState<any[]>([
    { roleName: '신데렐라' },
    { roleName: '엄마' },
    { roleName: '마법사' },
    { roleName: '왕' },
    { roleName: '왕자' },
  ]);
  function sendRoles(role: string, roleImg: string, index: number) {
    if (rolestates[index].isSelected) {
      alert('이미 선택된 친구에요');
      return;
    }
    setRolsestates(function (array) {
      let narray: UserRoleState[] = array.map((arg, idx) => {
        if (idx === index) {
          arg.isSelected = true;
        }
        return arg;
      });
      return narray;
    });

    const message = {
      code: 300,
      name: rolestates[index].name,
      role: role, 
      roleImg : roleImg
    };
    props.client.publish({
      destination: `/sub/channel/${props.roomId}`,
      body: JSON.stringify(message),
    });
  }

  useEffect(() => {
    axios
      .get('https://mangotail.shop/api/v1/script', {
        params: { scriptId: props.scriptIdx === 999 ? 2 : props.scriptIdx },
      })
      .then((res) => {
        console.log(res.data.data);
        setGiven_roles(res.data.data.roles);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [props.scriptIdx]);

  useEffect(() => {
    setRolsestates(
      props.ENTRY.map((entry) => {
        let tmpState: UserRoleState = {
          name: entry.name,
          isSelected: false,
        };
        return tmpState;
      })
    );
  }, [props.ENTRY]);

  return (
    <>
      <div className='bg-white shadow w-[24rem] h-[30rem] px-4'>
        <div className='flex items-center px-3 py-3'>
          <Image
            src={img_yellowbear}
            width={32}
            height={32}
            alt='역할 부여하기'
          />
          <p className='text-3xl font-medium ml-2'>역할 부여하기</p>
        </div>
        <div className='overflow-auto h-[23.5rem]' id={style.scroll}>
          {given_roles.map((role, key) => {
            return (
              <div
                key={key}
                className='flex items-center bg-gray-100 border-mainsky border-2 border-dashed rounded-xl w-[20rem] p-4 mb-2'
              >
                <Image
                  src={role.roleImg}
                  width={100}
                  height={100}
                  alt={role.rolename}
                  className='rounded-full size-20 object-cover'
                />
                <div className='ml-3'>
                  <label className='block ml-2 mb-1 text-xl font-medium'>
                    {role.roleName}
                  </label>
                  <select
                    id={`roleSelect_${key}`}
                    onChange={(e) => {
                      sendRoles(role.roleName, role.roleImg, Number(e.target.value));
                    }}
                    className='border border-gray-300 text-xl rounded-lg block w-full p-2
                    focus:outline-0 focus:ring-2 focus:ring-main'
                  >
                    <option selected>역할 선택</option>
                    {rolestates.map((member, key) => {
                      return (
                        <option
                          key={key}
                          value={key}
                          disabled={member.isSelected}
                          className={member.isSelected ? 'bg-gray-500' : ''}
                        >
                          {member.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
