import * as A from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import { fetcher } from '../dal/http';
import { UsersResponse, type User } from '../types/user';
import { UserSorting } from '../utils/ord';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchUsers = async (): Promise<User[]> =>
  pipe(
    await fetcher(`${API_BASE_URL}/users`, UsersResponse),
    A.sort(UserSorting.byName)
  );
