import React from "react";
import { Actions } from "../App";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";

import { Droppable } from "react-beautiful-dnd";

type Props = {
  state: Todo[];
  dispatch: React.Dispatch<Actions>;
};

const TodoList: React.FC<Props> = ({ state, dispatch }) => {
  return (
    <ul className='flex flex-row flex-wrap justify-center space-y-4 md:space-x-3 md:space-y-0'>
      <Droppable droppableId={"TodosList"}>
        {(provided) => (
          <div
            className='flex w-[90%] flex-col space-y-2 rounded-md border-2 border-green-300 p-4 shadow-md md:w-[45%]'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h2 className='mb-6  font-sans text-base font-bold md:text-2xl'>
              ACTIVE <span className='text-sky-600'>T</span>A
              <span className='text-sky-600'>S</span>KS
            </h2>
            {state?.map((todo, index) => {
              // filter active todos
              if (!todo.isCompleted) {
                return (
                  <SingleTodo
                    todo={todo}
                    key={todo.id}
                    dispatch={dispatch}
                    index={index}
                  />
                );
              }
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId={"TodosRemove"}>
        {(provided) => (
          <div
            className='flex w-[90%] flex-col space-y-2 rounded-md border-2 border-red-300 p-4 shadow-md md:w-[45%]'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h2 className='mb-6 font-sans text-base font-bold md:text-2xl'>
              COMPLETED <span className='text-sky-600'>T</span>A
              <span className='text-sky-600'>S</span>KS
            </h2>
            {state?.map((todo, index) => {
              // filter completed todos
              if (todo.isCompleted) {
                return (
                  <SingleTodo
                    todo={todo}
                    key={todo.id}
                    dispatch={dispatch}
                    index={index}
                  />
                );
              }
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </ul>
  );
};

export default TodoList;
