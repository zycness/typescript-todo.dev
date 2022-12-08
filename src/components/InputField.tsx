import React from "react";

type Props = {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  addTodo: (e: React.FormEvent) => void;
};

export const InputField: React.FC<Props> = ({ todo, setTodo, addTodo }) => {
  return (
    <form
      className='flex justify-center space-x-1'
      onSubmit={(e) => addTodo(e)}
    >
      <input
        type='text'
        placeholder='Enter a task'
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className='p-md relative w-1/2 rounded-md px-3 shadow-md focus:outline-none'
      />
      <button
        type='submit'
        className='rounded-md bg-green-500 p-2 font-sans font-bold text-white shadow-md transition ease-in-out active:scale-105'
      >
        Send
      </button>
    </form>
  );
};
