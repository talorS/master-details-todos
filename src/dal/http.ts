import * as E from 'fp-ts/Either';
import type * as t from 'io-ts';

export const fetcher = async <A>(
  url: string,
  codec: t.Type<A>,
  init?: RequestInit
): Promise<A> => {
  const response = await fetch(url, init);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data: unknown = await response.json();
  const decoded = codec.decode(data);

  if (E.isLeft(decoded)) {
    throw new Error('Invalid response format');
  }

  return decoded.right;
};
