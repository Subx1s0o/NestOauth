export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type RefreshToken = Omit<Tokens, 'accessToken'>;
export type AccessToken = Omit<Tokens, 'refreshToken'>;
