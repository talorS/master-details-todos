import { useNavigate } from 'react-router-dom';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import styles from './UsersList.module.css';
import { UserCard } from '../UserCard/UserCard';
import { ErrorState } from '../ErrorState/ErrorState';
import { EmptyState } from '../EmptyState/EmptyState';
import { UsersListSkeleton } from '../UsersListSkeleton/UsersListSkeleton';
import type { User } from '../../types/user';
import { routes } from '../../config/routes';
import { useUserSelection } from '../../hooks/useUserSelection';

interface UserListProps {
  users: User[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

export function UsersList({
  users,
  isLoading,
  isError,
  refetch,
}: UserListProps) {
  const navigate = useNavigate();
  const { selectedUserId } = useUserSelection({ users });

  if (isLoading) {
    return <UsersListSkeleton />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Error loading users"
        errorMessage="Failed to load users. Please try again."
        onRetry={refetch}
      />
    );
  }

  if (users.length === 0) {
    return <EmptyState message="No users found" />;
  }

  return (
    <div className={styles.grid}>
      {users.map((user: User) => (
        <UserCard
          key={user.id}
          user={user}
          isSelected={pipe(
            selectedUserId,
            O.exists((id) => user.id === id)
          )}
          onShowTodos={() => navigate(routes.userTodos.to({ userId: user.id }))}
        />
      ))}
    </div>
  );
}
