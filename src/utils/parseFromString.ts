import * as O from 'fp-ts/Option';

export const parseFromString = (value: string): O.Option<number> => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? O.some(parsed) : O.none;
};
