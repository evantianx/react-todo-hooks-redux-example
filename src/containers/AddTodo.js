import React from "react";
import { useTodosStore } from "../store";

export const AddTodo = () => {
  const { addTodo } = useTodosStore();
  const inputEl = React.useRef();
  const onSubmit = e => {
    e.preventDefault();
    const target = inputEl.current;

    if (!target.value.trim()) {
      return;
    }
    addTodo(target.value);
    target.value = "";
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input ref={inputEl} />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};
