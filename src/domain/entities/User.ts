export type User = {
  id: string;
  name: string;
  email: string;
};

export const User = {
  create: (props: { name: string; email: string }): User => ({
    ...props,
    id: Math.random().toString(36).slice(2),
  }),
};
