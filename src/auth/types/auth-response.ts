export type AuthResponse = {
  data: {
    avatar: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  };
  accessToken: string;
  refreshToken: string;
};
