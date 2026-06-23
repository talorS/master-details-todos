import { useOutletContext } from 'react-router-dom';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import styles from './UserTodos.module.css';
import { TodosList } from '../../components/TodosList/TodosList';
import { ErrorState } from '../../components/ErrorState/ErrorState';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { TodoListSkeleton } from '../../components/TodosListSkeleton/TodosListSkeleton';
import { useTodos } from '../../hooks/useTodos';
import { UserId } from '../../types/branded';
import type { SidePanelOutletContext } from '../SidePanel/SidePanel';

export function UserTodosPage() {
  const { selectedUserId, selectedUser } =
    useOutletContext<SidePanelOutletContext>();

  const { todos, isLoading, isError, refetch, toggleTodo } = useTodos({
    userId: selectedUserId,
  });

  if (isLoading) {
    return <TodoListSkeleton />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Error loading Todos"
        errorMessage="Failed to load Todos. Please try again."
        onRetry={refetch}
      />
    );
  }

  return pipe(
    selectedUserId,
    O.match(
      () => (
        <EmptyState message="Please select a valid user from the sidebar to view their Todos" />
      ),
      (userId) => (
        <>
          <h2 className={styles.title}>
            Todos of{' '}
            {pipe(
              selectedUser,
              O.map((user) => user.name),
              O.getOrElse(() => `User #${UserId.unwrap(userId)}`)
            )}
          </h2>
          <TodosList todos={todos} onToggleTodo={toggleTodo} />
        </>
      )
    )
  );
}
