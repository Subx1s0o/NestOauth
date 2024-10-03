export type User = {
  id: string;
  email: string;
  name: string;
  avatar: string;
  password?: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
};
