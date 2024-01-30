import React, { ReactNode } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

type Props = {
  sequence: number;
  title: string;
  isOpen: boolean;
  onClick: () => void;
  children: ReactNode;
};

export default function Section({ sequence, title, isOpen, onClick, children }: Props) {
  return (
    <div className='mb-4 mr-4'>
      <button
        type='button'
        onClick={onClick}
        className={`flex items-center bg-arrow justify-between w-full h-[8rem] p-8 ${isOpen ? 'rounded-t-xl' : 'rounded-xl'}`}
        aria-expanded='true'
        aria-controls='accordion-collapse-body-1'
      >
        <span className='text-3xl'>{`Scene ${sequence} [${title}]`}</span>
        {isOpen ? (
          <ChevronUpIcon className='size-8' />
        ) : (
          <ChevronDownIcon className='size-8' />
        )}
      </button>
      <div className={`${isOpen ? 'visible' : 'hidden'} h-fit`}>{children}</div>
    </div>
  );
}
