import React from "react";

import { FaLinkedin } from "react-icons/fa";

export const Footer: React.FC = () => {
  return (
    <footer className='flex min-h-[10vh] items-center justify-center bg-gray-800'>
      <h4 className='flex justify-center  text-xl font-semibold text-gray-400'>
        Made with &#128150; by
        <a
          href='https://www.linkedin.com/in/kevinnahuelf/'
          target='_blank'
          rel='noopener noreferrer'
          className='ml-2 flex items-center justify-center text-gray-300 underline'
        >
          Kevin Flores <FaLinkedin className='ml-2' size={"1.5rem"} />
        </a>
      </h4>
      <h4 className='flex justify-center  text-xl font-semibold text-gray-400'>
        Github repository:
        <a
          href='https://www.linkedin.com/in/kevinnahuelf/'
          target='_blank'
          rel='noopener noreferrer'
          className='ml-2 flex items-center justify-center text-gray-300 underline'
        >
          Kevin Flores <FaLinkedin className='ml-2' size={"1.5rem"} />
        </a>
      </h4>
    </footer>
  );
};
