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
