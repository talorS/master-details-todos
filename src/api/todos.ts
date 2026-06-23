import * as A from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import { fetcher } from '../dal/http';
import { TodoResponse, TodosResponse, type Todo } from '../types/todo';
import { TodoSorting } from '../utils/ord';
import { UserId } from '../types/branded';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchTodosByUserId = async (userId: UserId): Promise<Todo[]> =>
  pipe(
    await fetcher(`${API_BASE_URL}/users/${userId}/todos`, TodosResponse),
    A.sort(TodoSorting.byId)
  );

export const updateTodo = (todo: Todo): Promise<Todo> =>
  fetcher(`${API_BASE_URL}/todos/${todo.id}`, TodoResponse, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
