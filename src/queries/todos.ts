import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import * as O from 'fp-ts/Option';
import * as RA from 'fp-ts/ReadonlyArray';
import { pipe } from 'fp-ts/function';
import { toast } from 'react-toastify';
import { fetchTodosByUserId, updateTodo } from '../api/todos';
import { defaultQueryOptions } from '../config/queryClient';
import type { Todo } from '../types/todo';
import { unwrapTaskEither } from '../utils/taskEither';

type TodosQueryKey =
  | readonly ['todos', 'none']
  | readonly ['todos', 'some', number];

export const todosQueryKey = (userId: O.Option<number>): TodosQueryKey =>
  pipe(
    userId,
    O.match(
      (): TodosQueryKey => ['todos', 'none'],
      (id): TodosQueryKey => ['todos', 'some', id]
    )
  );

export const todosQueryFn = (userId: O.Option<number>) => () =>
  pipe(
    userId,
    O.match(
      () => Promise.reject(new Error('User ID is required')),
      (id) => unwrapTaskEither(fetchTodosByUserId(id))
    )
  );

export const updateTodoMutationFn = (todo: Todo) =>
  unwrapTaskEither(updateTodo(todo));

export const useTodosQuery = (userId: O.Option<number>) =>
  useQuery<ReadonlyArray<Todo>, Error>({
    queryKey: todosQueryKey(userId),
    queryFn: todosQueryFn(userId),
    enabled: O.isSome(userId),
    ...defaultQueryOptions,
  });

export const useUpdateTodoMutation = (userId: O.Option<number>) => {
  const queryClient = useQueryClient();
  const queryKey = todosQueryKey(userId);

  return useMutation<Todo, Error, Todo, { previousTodos?: ReadonlyArray<Todo> }>(
    {
      mutationFn: updateTodoMutationFn,
      onMutate: async (updatedTodo) => {
        await queryClient.cancelQueries({ queryKey });

        const previousTodos =
          queryClient.getQueryData<ReadonlyArray<Todo>>(queryKey);

        if (previousTodos) {
          queryClient.setQueryData<ReadonlyArray<Todo>>(
          queryKey,
            (currentTodos: ReadonlyArray<Todo> = []) =>
              RA.map<Todo, Todo>((todo) =>
                todo.id === updatedTodo.id ? updatedTodo : todo
              )(currentTodos)
          );
        }

        return { previousTodos };
      },
      onError: (error, updatedTodo, context) => {
        if (context?.previousTodos) {
          queryClient.setQueryData(queryKey, context.previousTodos);
        }

        toast.error(error.message, {
          toastId: `todo-update-error-${updatedTodo.id}`,
        });
      },
      onSuccess: (updatedTodo) => {
        toast.success('Todo marked as completed', {
          toastId: `todo-update-success-${updatedTodo.id}`,
        });
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey });
      },
    }
  );
};
