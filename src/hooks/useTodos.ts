import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import type { Todo } from '../types/todo';
import { fetchTodosByUserId, updateTodo } from '../api/todos';
import { defaultQueryOptions } from '../config/queryClient';

interface UseTodosOptions {
  userId: O.Option<number>;
}

interface UseTodosReturn {
  todos: Todo[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
  toggleTodo: (todo: Todo) => void;
}

const toggleTodoCompleted = (todo: Todo): Todo => ({
  ...todo,
  completed: !todo.completed,
});

export const useTodos = ({ userId }: UseTodosOptions): UseTodosReturn => {
  const queryClient = useQueryClient();
  const userIdValue = pipe(
    userId,
    O.getOrElseW(() => null)
  );
  const todosQueryKey = ['todos', userIdValue] as const;

  const query = useQuery<Todo[], Error>({
    queryKey: todosQueryKey,
    queryFn: () =>
      pipe(
        userId,
        O.match(
          () => Promise.reject(new Error('User ID is required')),
          fetchTodosByUserId
        )
      ),
    enabled: O.isSome(userId),
    ...defaultQueryOptions,
  });

  const mutation = useMutation<Todo, Error, Todo, { previousTodos?: Todo[] }>({
    mutationFn: updateTodo,
    onMutate: async (updatedTodo: Todo) => {
      await queryClient.cancelQueries({ queryKey: todosQueryKey });

      const previousTodos = queryClient.getQueryData<Todo[]>(todosQueryKey);

      if (previousTodos) {
        queryClient.setQueryData<Todo[]>(
          todosQueryKey,
          (old) =>
            old?.map((todo) =>
              todo.id === updatedTodo.id ? updatedTodo : todo
            ) ?? []
        );
      }

      return { previousTodos };
    },
    onError: (error, _updatedTodo, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(todosQueryKey, context.previousTodos);
      }

      toast.error(error.message, {
        toastId: `todo-update-error-${_updatedTodo.id}`,
      });
    },
    onSuccess: (updatedTodo) => {
      toast.success('Todo marked as completed', {
        toastId: `todo-update-success-${updatedTodo.id}`,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: todosQueryKey });
    },
  });

  const toggleTodo = (todo: Todo): void => {
    const updatedTodo = toggleTodoCompleted(todo);
    mutation.mutate(updatedTodo);
  };

  return {
    todos: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    toggleTodo,
  };
};
