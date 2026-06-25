import * as O from 'fp-ts/Option';
import type { Todo } from '../types/todo';
import { useTodosQuery, useUpdateTodoMutation } from '../queries/todos';

interface UseTodosOptions {
  userId: O.Option<number>;
}

interface UseTodosReturn {
  todos: ReadonlyArray<Todo>;
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
  const query = useTodosQuery(userId);
  const mutation = useUpdateTodoMutation(userId);

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
