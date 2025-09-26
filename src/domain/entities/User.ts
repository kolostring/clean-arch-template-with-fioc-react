import { v4 as uuid } from "uuid";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export const User = {
  create: (props: { name: string; email: string; password: string }): User => ({
    ...props,
    id: uuid(),
  }),
};
