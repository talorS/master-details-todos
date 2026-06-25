import * as RA from 'fp-ts/ReadonlyArray';
import { pipe } from 'fp-ts/function';
import styles from './TodosList.module.css';
import { TodoItem } from '../TodoItem/TodoItem';
import type { Todo } from '../../types/todo';

interface TodoItemsProps {
  todos: ReadonlyArray<Todo>;
  onToggleTodo: (todo: Todo) => void;
}

export function TodoItems({ todos, onToggleTodo }: TodoItemsProps) {
  return (
    <div className={styles.list}>
      {pipe(
        todos,
        RA.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onToggle={onToggleTodo} />
        ))
      )}
    </div>
  );
}
