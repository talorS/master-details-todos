import * as O from 'fp-ts/Option';

export const parseFromString = (value: string): O.Option<number> => {
  const parsed = parseInt(value, 10);
  return !isNaN(parsed) && parsed > 0 ? O.some(parsed) : O.none;
};
