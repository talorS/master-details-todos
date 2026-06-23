import * as t from 'io-ts';

export const TodoResponse = t.type({
  userId: t.number,
  id: t.number,
  title: t.string,
  completed: t.boolean,
});

export const TodosResponse = t.array(TodoResponse);

export type Todo = t.TypeOf<typeof TodoResponse>;
