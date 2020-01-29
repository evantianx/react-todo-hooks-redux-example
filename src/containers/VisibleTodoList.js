import React from "react";
import { TodoList } from "../components/TodoList";
import { useTodosStore } from "../store";

export const VisibleTodoList = () => {
  const { todos, toggleTodo } = useTodosStore();
  return <TodoList todos={todos} toggleTodo={toggleTodo} />;
};
