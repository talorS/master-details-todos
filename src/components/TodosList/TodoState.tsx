import styles from './TodosList.module.css';

interface TodoStatsProps {
  total: number;
  completed: number;
  remaining: number;
}

export function TodoState({ total, completed, remaining }: TodoStatsProps) {
  return (
    <div className={styles.stateWrapper}>
      <span className={styles.state}>
        Total: <strong>{total}</strong>
      </span>
      <span className={styles.state}>
        Completed: <strong>{completed}</strong>
      </span>
      <span className={styles.state}>
        Remaining: <strong>{remaining}</strong>
      </span>
    </div>
  );
}
