import * as RA from 'fp-ts/ReadonlyArray';
import styles from './TodosList.module.css';
import { EmptyState } from '../EmptyState/EmptyState';
import type { Todo } from '../../types/todo';
import { useTodoFilter } from '../../hooks/useTodoFilter';
import { TodoFilter } from './TodoFilter';
import { TodoItems } from './TodoItems';
import { TodoState } from './TodoState';

interface TodoListProps {
  todos: ReadonlyArray<Todo>;
  onToggleTodo: (todo: Todo) => void;
}

export function TodosList({ todos, onToggleTodo }: TodoListProps) {
  const { hideCompleted, filteredTodos, state, toggleHideCompleted } =
    useTodoFilter({ todos });

  if (RA.size(todos) === 0) {
    return <EmptyState message="No Todos found for this user" />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <TodoState
          total={state.total}
          completed={state.completed}
          remaining={state.remaining}
        />
        <TodoFilter
          hideCompleted={hideCompleted}
          onToggleHideCompleted={toggleHideCompleted}
        />
      </div>
      <TodoItems todos={filteredTodos} onToggleTodo={onToggleTodo} />
    </div>
  );
}
