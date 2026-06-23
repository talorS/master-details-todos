import styles from './TodosList.module.css';

interface TodoFilterProps {
  hideCompleted: boolean;
  onToggleHideCompleted: () => void;
}

export function TodoFilter({
  hideCompleted,
  onToggleHideCompleted,
}: TodoFilterProps) {
  return (
    <label className={styles.filter}>
      <input
        type="checkbox"
        checked={hideCompleted}
        onChange={onToggleHideCompleted}
        className={styles.filterCheckbox}
      />
      <span>Hide completed</span>
    </label>
  );
}
