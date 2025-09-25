import { v4 as uuid } from "uuid";

export type User = {
  id: string;
  name: string;
  email: string;
};

export const User = {
  create: (props: { name: string; email: string }): User => ({
    ...props,
    id: uuid(),
  }),
};
