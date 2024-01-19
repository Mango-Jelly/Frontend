'use client'
import style from '../modal.module.css'

import React, { useState } from 'react';



const Section = ({ id, title, isOpen, onClick, children }) => {
    return (
      <div id={id} >
        <h2>
          <button type="button" onClick={onClick}>
            <span>{title}</span>
            <svg
              className={isOpen ? 'rotate-180' : ''}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
            </svg>
          </button>
        </h2>
        <div className={isOpen ? 'visible' : 'hidden'}>{children}</div>
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
  
  return (
    <div className='col-span-2 '>
        



        <div>
            <h2>
                <button>
                    <span>

                    </span>
                </button>
            </h2>
            <div>
                <div>
                    <p>
                        
                    </p>
                    
                </div>
            </div>

        </div>
        <div id="accordion-collapse">
            <Section
                id="accordion-collapse-body-1"
                title="제 1 막"
                isOpen={openSection === 'accordion-collapse-body-1'}
                onClick={() => handleAccordionClick('accordion-collapse-body-1')}
            >
                <p>Flowbite is an open-source library of interactive components...</p>
                <p>
                Check out this guide to learn how to{' '}
                <a href="/docs/getting-started/introduction/">get started</a> and start
                developing websites even faster with components on top of Tailwind CSS.
                </p>
            </Section>

            <Section
                id="accordion-collapse-body-2"
                title="Is there a Figma file available?"
                isOpen={openSection === 'accordion-collapse-body-2'}
                onClick={() => handleAccordionClick('accordion-collapse-body-2')}
            >
                <p>Flowbite is first conceptualized and designed using the Figma software...</p>
                <p>
                Check out the <a href="https://flowbite.com/figma/">Figma design system</a>{' '}
                based on the utility classes from Tailwind CSS and components from Flowbite.
                </p>
            </Section>

            <Section
                id="accordion-collapse-body-3"
                title="What are the differences between Flowbite and Tailwind UI?"
                isOpen={openSection === 'accordion-collapse-body-3'}
                onClick={() => handleAccordionClick('accordion-collapse-body-3')}
            >
                <p>
                The main difference is that the core components from Flowbite are open
                source under the MIT license, whereas Tailwind UI is a paid product.
                </p>
                <p>
                However, we actually recommend using both Flowbite, Flowbite Pro, and even
                Tailwind UI as there is no technical reason stopping you from using the best
                of two worlds.
                </p>
                <p>Learn more about these technologies:</p>
                <ul>
                <li>
                    <a href="https://flowbite.com/pro/">Flowbite Pro</a>
                </li>
                <li>
                    <a href="https://tailwindui.com/">Tailwind UI</a>
                </li>
                </ul>
            </Section>
        </div>


    </div>
  )
}
