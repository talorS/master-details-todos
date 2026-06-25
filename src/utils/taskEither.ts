import * as E from 'fp-ts/Either';
import type * as TE from 'fp-ts/TaskEither';

export const unwrapTaskEither = <A>(
  taskEither: TE.TaskEither<Error, A>
): Promise<A> =>
  taskEither().then(
    E.match(
      (error) => Promise.reject(error),
      (value) => Promise.resolve(value)
    )
  );
