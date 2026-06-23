import { Link } from 'react-router-dom';
import styles from './Error.module.css';
import { routes } from '../../config/routes';

export function ErrorFallback() {
  return (
    <div className={styles.container}>
      <p className={styles.error}>Sorry, an unexpected error has occurred.</p>
      <Link to={routes.home.path} className={styles.link}>
        Go back home
      </Link>
    </div>
  );
}
