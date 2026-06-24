import clsx from 'clsx';
import styles from './ErrorState.module.css';

interface ErrorMessageProps {
  title: string;
  errorMessage: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title,
  errorMessage = 'An unexpected error occurred',
  onRetry,
  className,
}: ErrorMessageProps) {
  return (
    <div className={clsx(styles.error, className)}>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.message}>{errorMessage}</p>
        {onRetry && (
          <button
            className={styles.retryButton}
            onClick={onRetry}
            type="button"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
