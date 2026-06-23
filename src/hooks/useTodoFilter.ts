import * as A from 'fp-ts/Array';
import * as NEA from 'fp-ts/NonEmptyArray';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import { useSearchParams } from 'react-router-dom';
import type { Todo } from '../types/todo';

const HIDE_COMPLETED_PARAM = 'hideCompleted';

interface TodoFilterProps {
  todos: Todo[];
}

interface TodoFilterReturn {
  hideCompleted: boolean;
  filteredTodos: Todo[];
  toggleHideCompleted: () => void;
  state: { completed: number; total: number; remaining: number };
}

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
    hideCompleted ? A.filter((todo) => !todo.completed) : (x) => x
  );

  const state = pipe(
    todos,
    NEA.fromArray,
    O.fold(
      () => ({ completed: 0, total: 0, remaining: 0 }),
      (nonEmptyTodos) => {
        const completed = pipe(
          nonEmptyTodos,
          A.filter((t: Todo) => t.completed)
        ).length;
        const total = nonEmptyTodos.length;
        return { completed, total, remaining: total - completed };
      }
    )
  );

  return {
    hideCompleted,
    filteredTodos,
    toggleHideCompleted,
    state,
  };
}
