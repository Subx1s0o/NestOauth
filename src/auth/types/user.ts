export type User = {
  id: string;
  email: string;
  name: string;
  avatar: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
};
