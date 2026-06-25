import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';
import type * as t from 'io-ts';

const decode = <A>(
  codec: t.Type<A>,
  data: unknown
): E.Either<Error, A> =>
  pipe(
    codec.decode(data),
    E.mapLeft(() => new Error('Invalid response format'))
  );

export const fetcher = <A>(
  url: string,
  codec: t.Type<A>,
  init?: RequestInit
): TE.TaskEither<Error, A> =>
  pipe(
    TE.tryCatch(
      async () => {
        const response = await fetch(url, init);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        return response.json() as Promise<unknown>;
      },
      (error) =>
        error instanceof Error ? error : new Error('Unknown request error')
    ),
    TE.chainEitherKW((data) => decode(codec, data))
  );
