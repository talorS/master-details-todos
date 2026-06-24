import clsx from 'clsx';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  message: string;
  className?: string;
}

export function EmptyState({ message, className }: EmptyStateProps) {
  return (
    <div className={clsx(styles.empty, className)}>
      <p className={styles.message}>{message}</p>
    </div>
  );
}
