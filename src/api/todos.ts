import * as RA from 'fp-ts/ReadonlyArray';
import * as TE from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';
import { fetcher } from '../dal/http';
import { TodoResponse, TodosResponse, type Todo } from '../types/todo';
import { TodoSorting } from '../utils/ord';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchTodosByUserId = (
  userId: number
): TE.TaskEither<Error, ReadonlyArray<Todo>> =>
  pipe(
    fetcher(`${API_BASE_URL}/users/${userId}/todos`, TodosResponse),
    TE.map(RA.sort(TodoSorting.byId))
  );

export const updateTodo = (todo: Todo): TE.TaskEither<Error, Todo> =>
  fetcher(`${API_BASE_URL}/todos/${todo.id}`, TodoResponse, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
