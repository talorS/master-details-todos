import { Skeleton } from '../Skeleton/Skeleton';
import styles from './UsersListSkeleton.module.css';

export function UsersListSkeleton() {
  return (
    <div className={styles.grid}>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className={styles.skeletonCard}>
          <Skeleton height="1.5rem" width="70%" />
          <Skeleton height="1rem" width="50%" style={{ marginTop: '0.5rem' }} />
          <Skeleton
            height="2.5rem"
            variant="rectangular"
            style={{ marginTop: '1rem' }}
          />
        </div>
      ))}
    </div>
  );
}
