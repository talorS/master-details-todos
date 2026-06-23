import styles from './Home.module.css';

export function Home() {
  return (
    <div className={styles.emptyTodos}>
      Please select a user from the sidebar to view their Todos
    </div>
  );
}
