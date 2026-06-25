import * as RA from 'fp-ts/ReadonlyArray';
import { Skeleton } from '../Skeleton/Skeleton';
import styles from './TodosListSkeleton.module.css';

export function TodoListSkeleton() {
  return (
    <div className={styles.container}>
      {RA.makeBy(5, (i) => (
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
