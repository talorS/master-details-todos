import * as Ord from 'fp-ts/Ord';
import * as S from 'fp-ts/string';
import * as N from 'fp-ts/number';
import { pipe } from 'fp-ts/function';
import type { User } from '../types/user';
import type { Todo } from '../types/todo';

export const UserSorting = {
  byName: pipe(
    S.Ord,
    Ord.contramap((user: User) => user.name.toLowerCase())
  ),
};

export const TodoSorting = {
  byId: pipe(
    N.Ord,
    Ord.contramap((todo: Todo) => todo.id)
  ),
};
