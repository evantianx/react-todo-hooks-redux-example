import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";

import { selectDisplayedTodos, selectVisibilityFilter } from "./selectors";
import { setVisibilityFilter, toggleTodo, addTodo } from "./actions";

export const useTodosStore = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectDisplayedTodos);
  const visibilityFilter = useSelector(selectVisibilityFilter);

  const _addTodo = useCallback(text => dispatch(addTodo(text)), [dispatch]);
  const _setVisibilityFilter = useCallback(
    filter => dispatch(setVisibilityFilter(filter)),
    [dispatch]
  );
  const _toggleTodo = useCallback(id => dispatch(toggleTodo(id)), [dispatch]);

  return {
    todos,
    visibilityFilter,
    addTodo: _addTodo,
    setVisibilityFilter: _setVisibilityFilter,
    toggleTodo: _toggleTodo
  };
};
