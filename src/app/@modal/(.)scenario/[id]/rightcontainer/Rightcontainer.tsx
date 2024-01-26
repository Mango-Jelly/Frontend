'use client'

import piggie from '@/../public/piggie.svg'
import badmom from '@/../public/badmom.svg'
import Section from './_component/Section'
import LineForm from './_component/LineForm'
import React, { useState } from 'react';

type line = {
  id: number;
  role: number;
  script: string;
}

type dialog = {
  lines: line[]
}

type roles = {
  id: number;
  name: string;
  img: string;
}[];




const scene2: dialog = {
  lines: [
    {
      id: 1,
      role: 1,
      script: '(화를 내며) 왜 넌 항상 꿈 속에만 살고 있는 거야? 이 집안에서는 꿈따위 필요 없어. '
    },
    {
      id: 2,
      role: 2,
      script: '(억누르며) 계모님, 꿈은 제 용기와 희망이에요'
    },
    {
      id: 3,
      role: 1,
      script: '(비웃으며) 희망? 꿈은 네 운명을 바꾸지 못해. 그냥 이 집안에서 자기 나름대로 지내는 게 나을 거야.'
    },
    {
      id: 4,
      role: 2,
      script: '(슬픔 속에) 그런 말씀이시죠...'
    },
    {
      id: 5,
      role: 3,
      script: '신데렐라, 너의 마음을 알고 있어. 네'
    },
  ]
}


const sceneRoles = [
  { id: 1, name: "계모", img: badmom },
  { id: 2, name: "돼지렐라", img: piggie },
  { id: 3, name: "요정", img: piggie },
];



export default function Rightcontainer() {
  const [openSection, setOpenSection] = useState(null);


  const handleAccordionClick = (sectionId: any) => {
    setOpenSection((prevOpenSection) =>
      prevOpenSection === sectionId ? null : sectionId
    );
  };

  return (
<<<<<<< HEAD
    <div
      id="accordion-collapse"
      data-accordion="collapse"
      className=' bg-white h-full min-h-[63.4rem] w-full min-w-[80rem] font-bold overflow-y-scroll relative'
      style={{ padding: '3rem' }}
    >
      <Section
        id={"accordion-collapse-body-1"}
        title="SCENE 1 돼지렐라의 집"
        isOpen={openSection === 'accordion-collapse-body-1'}
        onClick={() => handleAccordionClick('accordion-collapse-body-1')}
      >
        <div className="p-5 border border-b-0 text-3xl bg-arrow">
          <div className="p-5 border border-b-0 font-normal bg-white">
            <p>안녕</p>
            <p>안녕</p>
            <p>안녕</p>
            <p>안녕</p>
            <p>안녕</p>
            <p>안녕</p>
            <p>안녕</p>
            <p>안녕</p>
            <p>안녕</p>
            <p>안녕</p>
            <p>안녕</p>
            <p>안녕</p>
            <p>안녕</p>
            <p>안녕</p>
            <p>안녕</p>
            <p>안녕</p>
            <p>안녕</p>
            <p>안녕</p>
            <p>안녕</p>
            <p>안녕</p>
            <p>안녕</p>
            <p>안녕</p>
            <p>안녕</p>
            <p>안녕</p>
            <p>안녕</p>
            <p>안녕</p>
            <p>안녕</p>
          </div>
=======
    <div className='col-span-2 '>
        
        <div id="accordion-collapse" data-accordion="collapse" className='overflow-auto scroll-auto  h-[60rem]'>
            <Section
                id={"accordion-collapse-body-1"}
                title={"SCENE 1 돼지렐라의 집"}
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


                {scene2.lines.map((line, id) => (
                  <LineForm 
                  key = {id}
                  roleImg = {sceneRoles[line.role - 1].img}
                  roleName = {sceneRoles[line.role - 1].name }
                  script =  {line.script}
                  />
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

>>>>>>> 797e6c88d8b431737a3227bbe040f5434bd34e30
        </div>
      </Section>
      <Section
        id="accordion-collapse-body-2"
        title="SCENE 2 무도회"
        isOpen={openSection === 'accordion-collapse-body-2'}
        onClick={() => handleAccordionClick('accordion-collapse-body-2')}
      >
        <div className="p-5 border border-b-0 text-3xl bg-arrow">
          <div className="p-5 border border-b-0 font-normal bg-white">
            {scene2.lines.map((line, key) => (
              <LineForm
                roleImg={sceneRoles[line.role - 1].img}
                roleName={sceneRoles[line.role - 1].name}
                script={line.script}
                key={key}
              />
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
          <div className="p-5 border border-b-0 font-normal bg-white">
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
  )
}
