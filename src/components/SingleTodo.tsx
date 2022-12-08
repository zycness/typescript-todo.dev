import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Actions } from "../App";

import { Draggable } from "react-beautiful-dnd";

type Props = {
  todo: Todo;
  dispatch: React.Dispatch<Actions>;
  index: number;
};

const SingleTodo: React.FC<Props> = ({ todo, dispatch, index }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // if edit is changed then focus
    inputRef.current?.focus();
  }, [edit]);

  const handleDone = (id: number, status: boolean) => {
    // on done set "done and completed"
    dispatch({ type: "done", payload: id });
    dispatch({ type: "completed", payload: { id, status: !status } });
  };

  const handleDelete = (id: number) => {
    // delete todo
    dispatch({ type: "remove", payload: id });
  };

  const handleEdited = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    //sent todos id and edited text, then change edit status
    dispatch({ type: "edit", payload: { id, todo: editTodo } });
    setEdit(false);
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <form
          className={`flex justify-between rounded-md bg-gray-600 p-2 text-white ${
            todo.isDone ? "opacity-50" : ""
          }`}
          onSubmit={(e) => handleEdited(e, todo.id)}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              ref={inputRef}
              type='text'
              className={`w-full rounded-md bg-gray-500 px-2 shadow-inner shadow-gray-900 outline-none ${
                todo.isDone ? "line-through" : ""
              }`}
              defaultValue={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
            />
          ) : (
            <p
              className={`flex items-center justify-center font-semibold ${
                todo.isDone ? "line-through" : ""
              }`}
            >
              {editTodo}
            </p>
          )}
          <div className='flex flex-col space-y-2'>
            <span
              title='Mark as done and completed'
              className='cursor-pointer'
              onClick={() => {
                handleDone(todo.id, todo.isCompleted);
              }}
            >
              <MdDone size={"2rem"} />
            </span>
            <span
              title='Enter edit mode'
              className='cursor-pointer'
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                  inputRef.current?.focus;
                }
              }}
            >
              <AiFillEdit size={"2rem"} />
            </span>
            <span
              title='Delete task'
              className='cursor-pointer'
              onClick={() => {
                handleDelete(todo.id);
              }}
            >
              <AiFillDelete size={"2rem"} />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
