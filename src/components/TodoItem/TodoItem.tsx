import clsx from 'clsx';
import styles from './TodoItem.module.css';
import type { Todo } from '../../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle?: (todo: Todo) => void;
}

export function TodoItem({ todo, onToggle }: TodoItemProps) {
  const handleToggle = () => {
    onToggle?.(todo);
  };

  return (
    <div className={clsx(styles.item, todo.completed && styles.completed)}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        className={styles.checkbox}
      />
      <span className={styles.title}>{todo.title}</span>
    </div>
  );
}
