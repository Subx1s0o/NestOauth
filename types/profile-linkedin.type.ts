export type LinkedInProfile = {
  provider: string;
  id: string;
  email: string;
  givenName: string;
  familyName: string;
  displayName: string;
  picture?: string;
  _raw: string;
  _json: {
    sub: string;
    email_verified: boolean;
    name: string;
    locale: {
      country: string;
      language: string;
    };
    given_name: string;
    family_name: string;
    email: string;
  };
};
