'use client'
import style from '../modal.module.css'
import Image from 'next/image'
import piggie from '@/../public/piggie.svg'
import badmom from '@/../public/badmom.svg'
import React, { Component, useState } from 'react';



type line = {
  id : number;
  role : number;
  script : string;
}

type dialog = {
  lines : line[]
}

type roles = {
  id : number;
  name : string;
  img : string;
}[];




const scene2 : dialog = {
  lines : [
    {
      id : 1,
      role : 1,
      script : '(화를 내며) 왜 넌 항상 꿈 속에만 살고 있는 거야? 이 집안에서는 꿈따위 필요 없어. '
    }, 
    {
      id : 2,
      role : 2,
      script : '(억누르며) 계모님, 꿈은 제 용기와 희망이에요'
    },
    {
      id : 3,
      role : 1,
      script : '(비웃으며) 희망? 꿈은 네 운명을 바꾸지 못해. 그냥 이 집안에서 자기 나름대로 지내는 게 나을 거야.'
    },
    {
      id : 4,
      role : 2,
      script : '(슬픔 속에) 그런 말씀이시죠...'
    },
    {
      id : 5,
      role : 3,
      script : '신데렐라, 너의 마음을 알고 있어. 네'
    },
  ]
}


const Section = ({ id, title, isOpen, onClick, children }) => {
    return (
      <div id={id} className='mb-[2rem]'>

        <h2 className='w-full h-full  '>
          <button type="button" onClick = {onClick} className={` flex w-full ${isOpen ? 'h-[7rem]' : 'h-[10rem]'}  items-center bg-arrow justify-between w-full p-5  rtl:text-right  border border-b-0 border-gray-200 openSection === 'accordion-collapse-body-1' rounded-lg   gap-3`} aria-expanded="true" aria-controls="accordion-collapse-body-1">
            <span className='text-5xl ml-[2rem]'>{title}</span>
            <svg data-accordion-icon className="w-[1rem] h-[1rem] rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" stroke-linecap="round"  stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
            </svg>
          </button>
        </h2>

        <div  className={`${isOpen ? 'visible' : 'hidden'} h-fit`}>{children}</div>
        
        <br />
      </div>
      
    );
  };



export default function Rightcontainer() {

    const [openSection, setOpenSection] = useState(null);

    const handleAccordionClick = (sectionId) => {
      setOpenSection((prevOpenSection) =>
        prevOpenSection === sectionId ? null : sectionId
      );
    };

    const sceneRoles = [
      { id: 1, name: "계모", img: badmom },
      { id: 2, name: "돼지렐라", img: piggie },
      { id: 3, name: "요정", img: piggie },
    ];
    
    function lineForm (line: line) {
      console.log(line)
      console.log(sceneRoles[line.role - 1].img)
      return (
        
        <div className=''>
          <p className='flex items-center'>

              <Image 
                className='w-[2rem] h-[2rem]' 
                src = {sceneRoles[line.role - 1].img}
              />
            <p className='m-[1rem] text-nowrap whitespace-nowrap '>{sceneRoles[line.role - 1].name} :</p>
            <p className='m-[1rem]'>  {line.script} </p>

          </p>
        </div>

      )
    }


  return (
    <div className='col-span-2 '>
        
        <div id="accordion-collapse" data-accordion="collapse" className='overflow-auto scroll-auto  h-[60rem]'>
            <Section
                id="accordion-collapse-body-1"
                title="SCENE 1 돼지렐라의 집"
                isOpen={openSection === 'accordion-collapse-body-1'}
                onClick={() => handleAccordionClick('accordion-collapse-body-1')}
            >
              <div className="p-5 border border-b-0 text-3xl bg-arrow">
                <div className="p-5 border border-b-0 bg-white">

                  <p>안녕</p>
                  <p>안녕</p>
                  <p>안녕</p>
                  <p>안녕</p>
                  <p>안녕</p>
                  <p>안녕</p>
                  <p>안녕</p>
                </div>
              </div>
            </Section>

            <Section
                id="accordion-collapse-body-2"
                title="SCENE 2 무도회"
                isOpen={openSection === 'accordion-collapse-body-2'}
                onClick={() => handleAccordionClick('accordion-collapse-body-2')}
            >
              <div className="p-5 border border-b-0 text-3xl bg-arrow">
                <div className="p-5 border border-b-0 bg-white">


                {scene2.lines.map((line) => (
                  lineForm(line)
                ))}

                </div>
              </div>
            </Section>

            <Section
                id="accordion-collapse-body-3"
                title="SCENE 3 도살장"
                isOpen={openSection === 'accordion-collapse-body-3'}
                onClick={() => handleAccordionClick('accordion-collapse-body-3')}
            >
              <div className="p-5 border border-b-0 text-3xl bg-arrow">
                <div className="p-5 border border-b-0 bg-white">
                  <p>안녕</p>
                  <p>안녕</p>
                  <p>안녕</p>
                  <p>안녕</p>
                  <p>안녕</p>
                  <p>안녕</p>
                  <p>안녕</p>
                </div>
              </div>

            </Section>

        </div>
    
    </div>
  )
}
