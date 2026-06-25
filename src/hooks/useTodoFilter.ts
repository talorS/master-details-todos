import * as O from 'fp-ts/Option';
import * as RA from 'fp-ts/ReadonlyArray';
import { pipe } from 'fp-ts/function';
import { useSearchParams } from 'react-router-dom';
import type { Todo } from '../types/todo';

const HIDE_COMPLETED_PARAM = 'hideCompleted';

interface TodoFilterProps {
  todos: ReadonlyArray<Todo>;
}

interface TodoFilterReturn {
  hideCompleted: boolean;
  filteredTodos: ReadonlyArray<Todo>;
  toggleHideCompleted: () => void;
  state: { completed: number; total: number; remaining: number };
}

const initialState = { completed: 0, total: 0, remaining: 0 };

export function useTodoFilter({ todos }: TodoFilterProps): TodoFilterReturn {
  const [searchParams, setSearchParams] = useSearchParams();
  const hideCompleted = pipe(
    O.fromNullable(searchParams.get(HIDE_COMPLETED_PARAM)),
    O.exists((value) => value === 'true')
  );

  const toggleHideCompleted = () => {
    setSearchParams((currentParams) => {
      const searchParams = new URLSearchParams(currentParams);

      if (hideCompleted) {
        searchParams.delete(HIDE_COMPLETED_PARAM);
      } else {
        searchParams.set(HIDE_COMPLETED_PARAM, 'true');
      }

      return searchParams;
    });
  };

  const filteredTodos = pipe(
    todos,
    hideCompleted ? RA.filter((todo) => !todo.completed) : (x) => x
  );

  const state = pipe(
    todos,
    RA.reduce(initialState, (currentState, todo) => {
      const completed = todo.completed
        ? currentState.completed + 1
        : currentState.completed;
      const total = currentState.total + 1;

      return {
        completed,
        total,
        remaining: total - completed,
      };
    })
  );

  return {
    hideCompleted,
    filteredTodos,
    toggleHideCompleted,
    state,
  };
}
