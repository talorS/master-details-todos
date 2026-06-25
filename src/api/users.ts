import * as RA from 'fp-ts/ReadonlyArray';
import * as TE from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';
import { fetcher } from '../dal/http';
import { UsersResponse, type User } from '../types/user';
import { UserSorting } from '../utils/ord';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchUsers = (): TE.TaskEither<Error, ReadonlyArray<User>> =>
  pipe(
    fetcher(`${API_BASE_URL}/users`, UsersResponse),
    TE.map(RA.sort(UserSorting.byName))
  );
