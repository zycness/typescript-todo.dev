import React, { useEffect, useReducer, useState } from "react";

import { InputField } from "./components/InputField";
import TodoList from "./components/TodoList";
import { Todo } from "./model";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

export type Actions =
  | { type: "done"; payload: number }
  | { type: "completed"; payload: { id: number; status: boolean } }
  | { type: "add"; payload: string }
  | { type: "edit"; payload: { id: number; todo: string } }
  | { type: "remove"; payload: number }
  | {
      type: "newIndex";
      payload: { fromIndex: number; toIndex: number };
    }
  | { type: "addOldTodos"; payload: Todo[] };

const TodoReducer = (state: Todo[], action: Actions): Todo[] => {
  switch (action.type) {
    case "add": {
      // create todo element
      let list = [
        ...state,
        {
          id: Math.floor(Math.random() * Date.now()),
          todo: action.payload,
          isDone: false,
          isCompleted: false,
        },
      ];
      // store changes
      localStorage.setItem("todos", JSON.stringify(list));
      return list;
    }
    case "remove": {
      // filter list and exclude the todo that has same value as action.payload
      let list = state.filter((todo) => todo.id !== action.payload);
      // store changes
      localStorage.setItem("todos", JSON.stringify(list));
      return list;
    }
    case "done": {
      let list = state.map((todo) =>
        todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
      );
      // store changes
      localStorage.setItem("todos", JSON.stringify(list));
      // map list and look for a coincidence between todo.id and action.payload and after that set it as done
      // action.payload = todo_id_to_set_as_done
      return list;
    }
    case "completed": {
      let list = state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, isCompleted: action.payload.status }
          : todo
      );
      // store changes
      localStorage.setItem("todos", JSON.stringify(list));
      // map list and look for a coincidence between todo.id and action.payload.id and after that set it as done
      // action.payload.id = todo_id_to_set_as_done
      return list;
    }
    case "edit": {
      let list = state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, todo: action.payload.todo }
          : todo
      );
      // store changes
      localStorage.setItem("todos", JSON.stringify(list));
      // map list and look for a coincidence between todo.id and action.payload.id and after that set the edited text
      // action.payload.id = todo_id_to_set_the_edited_text
      // action.payload.todo = todos_edited_text
      return list;
    }
    case "newIndex": {
      // (A) = todo that is pretend to be moved to "toIndex"
      // (B) = todo that would be replaced by (A)
      // extract (A) that is pretend to be moved
      let todo = state[action.payload.fromIndex];
      // delete (A) from old_index
      state.splice(action.payload.fromIndex, 1);
      // Add (A) to (B)_index and implicitly (B) will be moved
      state.splice(action.payload.toIndex, 0, todo);
      console.log(state);
      // store changes
      localStorage.setItem("todos", JSON.stringify(state));

      return state;
    }
    case "addOldTodos": {
      // return oldTodos
      return action.payload;
    }
    default:
      // return Todo[] | []
      return state;
  }
};

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [state, dispatch] = useReducer(TodoReducer, []);

  useEffect(() => {
    // look if there is any todo already
    if (localStorage.getItem("todos")) {
      let fetchedData = localStorage.getItem("todos");
      // preventing data to be equal to null
      if (fetchedData === null) {
        return;
      } else {
        // parsing data
        let oldTodos = JSON.parse(fetchedData);
        // adding old todos
        dispatch({
          type: "addOldTodos",
          payload: oldTodos,
        });
      }
    }
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    // if todos text exist then dispatch data
    if (todo) {
      dispatch({ type: "add", payload: todo });
    }
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    // if there is no destination = todo didnt get moved
    if (!destination) {
      return;
    }

    // apply new index for oldIndex
    dispatch({
      type: "newIndex",
      payload: {
        fromIndex: source.index,
        toIndex: destination.index,
      },
    });

    //if destination is set to active then dispatch todos id and status
    if (destination.droppableId === "TodosList") {
      return dispatch({
        type: "completed",
        payload: { id: parseInt(result.draggableId), status: false },
      });
    } else {
      //if destination is set to completed then dispatch todos id and status
      return dispatch({
        type: "completed",
        payload: { id: parseInt(result.draggableId), status: true },
      });
    }
  };

  return (
    <DragDropContext
      onDragEnd={(e) => {
        handleDragEnd(e);
      }}
    >
      <div className='max-w-screen flex min-h-screen flex-col items-center justify-start bg-gray-100 py-12'>
        <div className='container flex w-full flex-col space-y-4 text-center'>
          <h1 className='font-sans text-5xl font-extrabold md:text-8xl'>
            <span className='text-sky-600'>T</span>A
            <span className='text-sky-600'>S</span>K.DEV
          </h1>
          <InputField todo={todo} setTodo={setTodo} addTodo={handleAdd} />
          <TodoList state={state} dispatch={dispatch} />
        </div>
      </div>
    </DragDropContext>
  );
};

export default App;
