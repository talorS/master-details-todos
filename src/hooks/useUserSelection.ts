import { useMemo } from 'react';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import type { User } from '../types/user';
import { useParams } from 'react-router-dom';
import { parseFromString } from '../utils/parseFromString';

interface UseUserSelectionProps {
  users: User[];
}

interface UseUserSelectionReturn {
  selectedUserId: O.Option<number>;
  selectedUser: O.Option<User>;
}

export function useUserSelection({
  users,
}: UseUserSelectionProps): UseUserSelectionReturn {
  const { userId } = useParams();
  const selectedUserId = pipe(
    O.fromNullable(userId),
    O.chain(parseFromString)
  );

  const selectedUser = useMemo(
    () =>
      pipe(
        selectedUserId,
        O.chain((id) =>
          O.fromNullable(users.find((user) => user.id === id))
        )
      ),
    [selectedUserId, users]
  );

  return {
    selectedUserId,
    selectedUser,
  };
}
