import { useMemo } from 'react';
import * as O from 'fp-ts/Option';
import * as RA from 'fp-ts/ReadonlyArray';
import { pipe } from 'fp-ts/function';
import type { User } from '../types/user';
import { useParams } from 'react-router-dom';
import { parseFromString } from '../utils/parseFromString';

interface UseUserSelectionProps {
  users: ReadonlyArray<User>;
}

interface UseUserSelectionReturn {
  selectedUserId: O.Option<number>;
  selectedUser: O.Option<User>;
}

export function useUserSelection({
  users,
}: UseUserSelectionProps): UseUserSelectionReturn {
  const { userId } = useParams();
  const selectedUserId = useMemo(
    () =>
      pipe(
        O.fromNullable(userId),
        O.chain(parseFromString)
      ),
    [userId]
  );

  const selectedUser = useMemo(
    () =>
      pipe(
        selectedUserId,
        O.chain((id) => pipe(users, RA.findFirst((user) => user.id === id)))
      ),
    [selectedUserId, users]
  );

  return {
    selectedUserId,
    selectedUser,
  };
}
