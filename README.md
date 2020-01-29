## Todo App

To show how to use hooks + redux together in an App. [Check the original one at master branch or [here](https://github.com/reduxjs/redux/tree/master/examples/todos/src)]

```js
// src/store/index.js

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
```

Use hooks to organize store logic at one place, so that the component code can be shorter and cleaner. And the most important thing is that we could reuse the hook at any other place.

```js
// src/containers/VisibleTodoList.js

import React from "react";
import { TodoList } from "../components/TodoList";
import { useTodosStore } from "../store";

export const VisibleTodoList = () => {
  const { todos, toggleTodo } = useTodosStore();
  return <TodoList todos={todos} toggleTodo={toggleTodo} />;
};
```

By the way, also use reselect to simplify the way to get todos to display:

```js
import { createSelector } from "reselect";
import { VisibilityFilters } from "../actions";

export const selectAllTodos = state => state.todos;
export const selectVisibilityFilter = state => state.visibilityFilter;

export const selectDisplayedTodos = createSelector(
  selectAllTodos,
  selectVisibilityFilter,
  (todos, filter) => {
    switch (filter) {
      case VisibilityFilters.SHOW_ALL:
        return todos;
      case VisibilityFilters.SHOW_COMPLETED:
        return todos.filter(t => t.completed);
      case VisibilityFilters.SHOW_ACTIVE:
        return todos.filter(t => !t.completed);
      default:
        throw new Error("Unknown filter: " + filter);
    }
  }
);
```
