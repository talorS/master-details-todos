import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { routes } from '../../config/routes';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <h2>
          <Link className={styles.homeLink} to={routes.home.path}>
            Users Todos App
          </Link>
        </h2>
        <p className={styles.subtitle}>created by @talors</p>
      </div>
    </header>
  );
}
