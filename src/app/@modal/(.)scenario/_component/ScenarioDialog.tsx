'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import AccordionSection from './AccordionSection';
import { ScriptType } from '../types/ScriptType';
import style from './scrollbar.module.css';

type Props = {
  scriptInfo: ScriptType;
};

export default function ScenarioDialog({ scriptInfo }: Props) {
  const [openSection, setOpenSection] = useState<number | null>(0);

  const handleAccordionClick = (sequenceNum: number) => {
    setOpenSection((prevOpenSection) =>
      prevOpenSection === sequenceNum ? null : sequenceNum
    );
  };

  const bottomButtonClass =
    'text-3xl text-center rounded-3xl w-64 p-6 m-2 shadow';

  return (
    <div className='relative flex flex-col bg-white/80 w-[62%] h-[88%] m-2 p-8 z-20'>
      <div
        className='relative w-full h-5/6 overflow-y-scroll'
        id={style.scroll}
        // data-accordion='collapse'
      >
        {scriptInfo.scenes.map((value, key) => {
          return (
            <div key={key}>
              <AccordionSection
                sequence={value.seq}
                title={value.title}
                isOpen={openSection === value.seq}
                onClick={() => handleAccordionClick(value.seq)}
              >
                <div className='rounded-b-xl bg-gray-200 px-8 pb-8'>
                  <div className='bg-white p-4'>
                    {value.dialogs.map((dialogValue, dialogKey) => {
                      return (
                        <div key={dialogKey} className='flex items-center'>
                          {dialogValue.roles.map((roleValue, roleKey) => {
                            return (
                              <Image
                                key={roleKey}
                                src={roleValue.roleImg}
                                width={100}
                                height={100}
                                alt={value.title}
                                className='shrink-0 rounded-full size-12 m-2'
                              ></Image>
                            );
                          })}
                          <p className='text-xl'>{`: ${dialogValue.dialog}`}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </AccordionSection>
            </div>
          );
        })}
      </div>

      <div className='absolute bottom-6 right-12 flex'>
        <button
          className={`${bottomButtonClass} bg-gray-200 hover:bg-gray-300`}
        >
          취소
        </button>
        <button
          className={`${bottomButtonClass} bg-main text-white font-semibold hover:bg-maindark`}
        >
          연극 선택
        </button>
      </div>
    </div>
  );
}
