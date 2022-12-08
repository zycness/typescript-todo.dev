import React from "react";

import { FaGithub, FaLinkedin } from "react-icons/fa";

export const Footer: React.FC = () => {
  return (
    <footer className='flex min-h-[10vh] flex-col items-center justify-center bg-gray-800'>
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
      <a
        href='https://github.com/zycness/typescript-todo.dev'
        target='_blank'
        rel='noopener noreferrer'
        className='ml-2 flex items-center justify-center text-xl font-semibold text-gray-400 underline'
      >
        Github repository: <FaGithub className='ml-2' size={"1.5rem"} />
      </a>
    </footer>
  );
};
