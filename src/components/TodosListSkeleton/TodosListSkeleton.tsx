import { Skeleton } from '../Skeleton/Skeleton';
import styles from './TodosListSkeleton.module.css';

export function TodoListSkeleton() {
  return (
    <div className={styles.container}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton
          key={i}
          height="3rem"
          variant="rectangular"
          className={styles.item}
        />
      ))}
    </div>
  );
}
