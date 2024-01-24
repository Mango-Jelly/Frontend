import React, { Component, useState } from 'react';




export default function Section({ id, title, isOpen, onClick, children }: { id: string, title: string, isOpen: boolean, onClick: any, children: any }) {


  return (
    <div id={id} className='mb-[2rem]'>

      <h2 className='w-full h-full  '>
        <button type="button" onClick={onClick} className={` flex w-full ${isOpen ? 'h-[7rem]' : 'h-[10rem]'}  items-center bg-arrow justify-between w-full p-5  rtl:text-right  border border-b-0 border-gray-200 openSection === 'accordion-collapse-body-1' rounded-lg   gap-3`} aria-expanded="true" aria-controls="accordion-collapse-body-1">
          <span className='text-5xl ml-[2rem]'>{title}</span>
          <svg data-accordion-icon className="w-[1rem] h-[1rem] rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
          </svg>
        </button>
      </h2>

      <div className={`${isOpen ? 'visible' : 'hidden'} h-fit`}>{children}</div>

      <br />
    </div>

  );
};
